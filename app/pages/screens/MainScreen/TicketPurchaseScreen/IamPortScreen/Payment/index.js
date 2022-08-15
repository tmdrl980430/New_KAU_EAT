import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import IMP from 'iamport-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { purchaseTicketRecoilState } from '../../../../../../recoil';

const Payment = ({navigation}) => {


    //결제가 완료된 후 [0,0,0,0]으로 초기화를 시켜줘야 함(아직 안함)
    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );


    
    let cost = (purchaseTicket[0] * 3000) + (purchaseTicket[1] * 5000) + (purchaseTicket[2] * 6000) + (purchaseTicket[3] * 5000) 


    useEffect(() => {
        console.log('purchaseTicket', purchaseTicket);
        console.log('cost', cost);
    }, []);

    const data = {
        pg: 'uplus', // 실제 계약 후에는 실제 상점아이디로 변경
        pay_method: 'card', // 'card'만 지원됩니다.
        merchant_uid: "order_monthly_0002", // 상점에서 관리하는 주문 번호
        name: '식권',
        amount: cost, // 결제창에 표시될 금액. 실제 승인이 이뤄지지는 않습니다.
        customer_uid: 'imp27534884', // 필수 입력.
        buyer_email: '',
        buyer_name: '김승기',
        buyer_tel: '',
        m_redirect_url: 'https://www.naver.com/',
        app_scheme: 'kaueat'
    };

    const callBack = (res) => {
        console.group('callback');
        console.log(res);
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
        width : wp('100%'),
        height: hp('100%'),
        backgroundColor : 'white'
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Payment;