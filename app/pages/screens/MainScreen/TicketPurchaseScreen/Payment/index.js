import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import IMP from 'iamport-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from 'recoil';
import {jwtRecoilState, paymentsRecoilState, purchasemodalRecoilState, purchaseTicketRecoilState} from '../../../../../recoil';
import axios from 'axios';

const Payment = ({navigation, route}) => {

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);
    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [purchasemodalState, setPurchaseModalState] = useRecoilState(purchasemodalRecoilState);


    const [paymentsState, setPamentsState] = useRecoilState(paymentsRecoilState);


    //결제가 완료된 후 [0,0,0,0]으로 초기화를 시켜줘야 함(아직 안함)
    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );

    const {uid} = route.params.uid

    useEffect(() => {
        console.log("uid", uid);
        setPamentsState(true);
    }, []);

    const fetchPay = async (res) => {
        console.log('fetchPay');
        if (res.imp_success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
            // axios로 HTTP 요청
            axios({
                url: `http://3.38.35.114/payments/complete`, // 예: https://www.myservice.com/payments/complete
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": jwt
                },
                data: {
                    imp_uid: res.imp_uid,
                    merchant_uid: res.merchant_uid
                }
            }).then((res) => {
                // 서버 결제 API 성공시 로직
                console.log('callBackres', res);
                setPurchaseModalState(true);

            }).catch ((e) => {
                console.log(`out payerror : ${e}`);
            })
        } else {
            //결제 실패 modal 띄워주기 (진행안함)
            console.log(`결제에 실패하였습니다. 에러 내용: ${res.error_msg}`);
            setPurchaseModalState(true);
        }

    };

    let cost = (purchaseTicket[0] * 3000) + (purchaseTicket[1] * 5000) + (
        purchaseTicket[2] * 6000
    ) + (purchaseTicket[3] * 5000)

    useEffect(() => {
        console.log('purchaseTicket', purchaseTicket);
        console.log('cost', cost);
    }, []);

    const data = {
        pg: 'uplus', // 실제 계약 후에는 실제 상점아이디로 변경
        pay_method: 'card', // 'card'만 지원됩니다.
        merchant_uid: uid, // 상점에서 관리하는 주문 번호
        name: '식권',
        amount: cost, // 결제창에 표시될 금액. 실제 승인이 이뤄지지는 않습니다.
        customer_uid: 'imp27534884', // 필수 입력.
        buyer_email: '',
        buyer_name: '김승기',
        buyer_tel: '',
        app_scheme: 'kaueat'
    };

    const callBack = (res) => {
        console.group('callback');
        //console.log('callBackres', res);
        console.log('callBackres.imp', res.imp_uid);
        console.log('callBackres.merchant_uid', res.merchant_uid);
        console.log('callBackres.imp_success', res.imp_success);
        fetchPay(res);
        
        console.groupEnd('callback');

        console.group('userData');
        console.log(data);
        console.groupEnd('userData');

        //결제가 되는지 안되든지 메인화면으로 이동
        navigation.replace('Main');
    };

    return (
        <IMP.Payment
            style={styles.backgroud}
            userCode={'imp27534884'}
            loading={(
                <View style={styles.loading}>
                    <ActivityIndicator/>
                </View>
            )}
            data={data}
            callback={callBack}/>
    );

};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: hp('30%'),
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: 'white'
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Payment;