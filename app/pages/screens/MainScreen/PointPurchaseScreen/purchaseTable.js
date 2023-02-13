import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    Button,
    useWindowDimensions
} from 'react-native';
import axios from 'axios';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from 'recoil';
import {dateRecoilState, jwtRecoilState, severURLRecoilState} from '../../../../recoil';

import PurchaseTableComponent from '../../../../utils/purchase/purchase';
import PurchaseComponent from './purchaseComponent'
import PurchaseComponent1 from './purchaseComponent1'
import PurchaseComponent2 from './purchaseComponent2'
import PurchaseComponent3 from './purchaseComponent3'
import PurchaseComponent4 from './purchaseComponent4';

const PurchaseTable = () => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false)

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [error, setError] = useState(null);

    const [date, setDate] = useRecoilState(dateRecoilState);

    useEffect(() => {
        const now = new Date();

        const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
        const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
        const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

        const today = String(koreaNow.getFullYear()) + '-' + String(
            koreaNow.getMonth() + 1
        ).padStart(2, '0') + '-' + String(koreaNow.getDate()).padStart(2, '0')

        setDate(today);
    }, [])


    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <PurchaseComponent
                    type={"5만원권"}
                    price={50000}
                    mealType={"5만원권"}
                    menu={"5만원 이상 결제시 포인트 추가 가능"}
                    key={0}
                    index={0}/>
                <PurchaseComponent1
                    type={"10만원권"}
                    price={100000}
                    mealType={"10만원권"}
                    menu={"10만원 이상 결제시 5% 포인트 추가 제공"}
                    key={1}
                    index={1}/>
                <PurchaseComponent2
                    type={"20만원권"}
                    price={200000}
                    mealType={"20만원권"}
                    menu={"20만원 이상 결제시 10% 포인트 추가 제공"}
                    key={2}
                    index={2}/>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%'),
        ...Platform.select({
            ios: {},
            android: {
                marginStart: wp('0.5%'),
                marginEnd: wp('0.5%')
            }
        })
    },
    dateText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp("2.1%"),
        color: '#2B2D41'
    }
});

export default PurchaseTable;