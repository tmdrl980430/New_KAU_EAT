import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import IMP from 'iamport-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from 'recoil';
import {
    dateRecoilState,
    jwtRecoilState,
    paymentsRecoilState,
    purchasemodalRecoilState,
    purchaseTicketRecoilState,
    severURLRecoilState,
    userIdxRecoilState,
    userNameRecoilState
} from '../../../../../recoil';
import axios from 'axios';

const Payment = ({navigation, route}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);
    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [purchasemodalState, setPurchaseModalState] = useRecoilState(
        purchasemodalRecoilState
    );

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [name, setName] = useRecoilState(userNameRecoilState);

    const [date, setDate] = useRecoilState(dateRecoilState);

    const [paymentsState, setPaymentsState] = useRecoilState(paymentsRecoilState);

    //결제가 완료된 후 [0,0,0,0]으로 초기화를 시켜줘야 함(아직 안함)
    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );

    const {uid} = route.params.uid

    useEffect(() => {
        setPaymentsState(true);
    }, []);

    const fetchPay = async (res) => {
        if (res.imp_success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
            // axios로 HTTP 요청
            axios({
                url: `${IP}/payments/complete`, // 예: https://www.myservice.com/payments/complete
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": jwt
                },
                data: {
                    imp_uid: res.imp_uid,
                    merchant_uid: res.merchant_uid
                }
            })
                .then((res) => {
                    // 서버 결제 API 성공시 로직

                    if (res.data.code === 1000) {
                        userTicketModify();
                        setPurchaseModalState(false);
                    } else {
                        setPurchaseModalState(true);
                    }
                })
                .catch((e) => {
                })
            } else {
            //결제 실패 modal 띄워주기 (진행안함)
            setPurchaseModalState(true);
        }

    };

    const userTicketModify = async () => {

        const response = await axios
            .patch(`${IP}/mealtickets?type=buy`, {
                userIdx: userIdx,
                date: date,
                mealTickets: [
                    {
                        mealTypeIdx: 1,
                        amount: purchaseTicket[0]
                    }, {
                        mealTypeIdx: 2,
                        amount: purchaseTicket[1]
                    }, {
                        mealTypeIdx: 3,
                        amount: purchaseTicket[2]
                    }, {
                        mealTypeIdx: 4,
                        amount: purchaseTicket[3]
                    }, {
                        mealTypeIdx: 5,
                        amount: purchaseTicket[4]
                    }
                ]
            })
            .then((response) => {

                if (response.data.code == 1000) {

                    setPurchaseTicket([0, 0, 0, 0, 0])
                    navigation.replace('Main');
                }
            })
            .catch((error) => {
            });
    }

    let cost = (purchaseTicket[0] * 3000) + (purchaseTicket[1] * 5000) + (
        purchaseTicket[2] * 6000
    ) + (purchaseTicket[3] * 5000) + (purchaseTicket[4] * 4500)


    const data = {
        pg: 'uplus', // 실제 계약 후에는 실제 상점아이디로 변경
        pay_method: 'card', // 'card'만 지원됩니다.
        merchant_uid: uid, // 상점에서 관리하는 주문 번호
        name: '식권',
        amount: cost, // 결제창에 표시될 금액. 실제 승인이 이뤄지지는 않습니다.
        customer_uid: 'imp47381767', // 필수 입력.
        buyer_email: '',
        buyer_name: name,
        buyer_tel: '',
        app_scheme: 'kaueat'
    };

    const callBack = (res) => {

        fetchPay(res);

        //결제가 되는지 안되든지 메인화면으로 이동
        navigation.replace('Main');
    };

    return (
        <IMP.Payment
            style={styles.backgroud}
            userCode={'imp47381767'}
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