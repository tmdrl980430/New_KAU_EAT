import React, { useEffect, useRef } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Bootpay, Extra } from 'react-native-bootpay-api'; 

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GoBootpayTest = () => {


    const bootpay = useRef<Bootpay>(null);

    // useEffect(() => {
    //     console.log('bootpay', bootpay);
    // }, [bootpay])

    const onPress = () => {

        console.log('bootpay', bootpay);

        const payload = {
            pg: 'kcp', //['kcp', 'danal', 'inicis', 'nicepay', 'lgup', 'toss', 'payapp', 'easypay', 'jtnet', 'tpay', 'mobilians', 'payletter', 'onestore', 'welcome'] 중 택 1
            method: '카카오페이', // ['카드', '휴대폰', '계좌이체', '가상계좌', '카카오페이', '네이버페이', '페이코', '카드자동'] 중 택 1
            order_name: '중식', //결제창에 보여질 상품명
            order_id: '2', //개발사에 관리하는 주문번호
            // subscription_id: '12345_21345', 개발사에 관리하는 주문번호 (정기결제용) authentication_id:
            // '12345_21345', 개발사에 관리하는 주문번호 (본인인증용) method: 'card', methods: ['card',
            // 'vbank', 'bank', 'phone'],  통합결제창 진행시 사용하고자 하는 결제수단 지정 가능, method와 함께 적용 불가
            price: 1000, //결제금액
        }
        //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함
        const items = [
            {
                name: '조식', //통계에 반영될 상품명
                qty: 1, //수량
                id: 'ITEM_CODE_KEYBOARD', //개발사에서 관리하는 상품고유번호
                price: 1000, //상품단가
                cat1: '조식', //카테고리 상 , 자유롭게 기술
                cat2: '중식', //카테고리 중, 자유롭게 기술
                cat3: '석식', //카테고리 하, 자유롭게 기술
            }
        ]

        //구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보
        const user = {
            id: 'id', //개발사에서 관리하는 회원고유번호
            username: 'name', //구매자명
            email: 'rlatmdrl98@gmail.com', //구매자 이메일
            gender: 0, //성별, 1:남자 , 0:여자
            birth: '1998-04-30', //생년월일 yyyy-MM-dd
            phone: '01071661761', //전화번호, 페이앱 필수
            area: '경기', // [서울,인천,대구,광주,부산,울산,경기,강원,충청북도,충북,충청남도,충남,전라북도,전북,전라남도,전남,경상북도,경북,경상남도,경남,제주,세종,대전] 중 택 1
            addr: '경기도 의정부시 능곡로' //주소
        }

        //기타 설정

        const extra = {
            card_quota: "0", //결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용
            app_scheme: "kaueat", //ios의 경우 카드사 앱 호출 후 되돌아오기 위한 앱 스키마명
            show_close_button: false, // x 닫기 버튼 삽입 (닫기버튼이 없는 PG사를 위한 옵션)
        }

        if (bootpay != null && bootpay.current != null) {
            console.log('bootpay if문', bootpay);
            console.log('bootpay if문', bootpay.current);
            bootpay
                .current
                .request(payload, items, user, extra);
        }

    }

    const onCancel = (data) => {
        console.log('-- cancel', data);
    }

    const onError = (data) => {
        console.log('-- error', data);
    }

    const onIssued = (data) => {
        console.log('-- issued', data);
    }

    const onConfirm = (data) => {
        console.log('-- confirm', data);
        if (bootpay != null && bootpay.current != null)
            bootpay
                .current
                .transactionConfirm(data);
    }

    const onDone = (data) => {
        console.log('-- done', data);
    }

    const onClose = () => {
        console.log('-- closed');
    }

    return (
        <View style={styles.container}> 
            <TouchableOpacity style={styles.button} onPress={onPress}> 
                <Text styles={styles.btnText}> 일반결제 결제테스트</Text>
            </TouchableOpacity> 
            {bootpay && (
                <Bootpay
                ref={bootpay}
                ios_application_id={
                    '62d9012be38c3000215afe9c'
                }
                android_application_id={
                    '62d9012be38c3000215afe9b'
                }
                onCancel={
                    onCancel
                }
                onError={
                    onError
                }
                onIssued={
                    onIssued
                }
                onConfirm={
                    onConfirm
                }
                onDone={
                    onDone
                }
                onClose={
                    onClose
                }/>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: wp('100%'),
        height: hp('15%'),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 10
    },
    btnText : {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('2.0%'),
        color: 'black',
    }
});

export default GoBootpayTest;