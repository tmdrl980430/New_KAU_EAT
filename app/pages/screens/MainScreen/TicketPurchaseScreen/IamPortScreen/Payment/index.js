import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import IMP from 'iamport-react-native';

const Payment = ({navigation, route}) => {
    const data = {
        pg: 'nice',
        pay_method: route.params
            ?.type,
        name: '아임포트 결제데이터 분석',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: '1000',
        buyer_name: "김승기",
        buyer_tel: "01071661761",
        buyer_email: "rlatmdrl98@gmail.com",
        buyer_addr: "경기 고양시",
        buyer_postcode:"11747",
        app_scheme: 'kaueat',
        digital: route.params
            ?.digital
    };

    const callBack = (res) => {
        console.group('callback');
        console.log(res);
        console.groupEnd('callback');

        console.group('userData');
        console.log(data);
        console.groupEnd('userData');
    };

    return (
        <IMP.Payment
            userCode={1}
            loading={<Text> 로딩중입니다.</Text>}
            data={data}
            callback={callBack}/>
    );
};

export default Payment;