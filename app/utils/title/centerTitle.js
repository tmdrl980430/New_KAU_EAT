import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//재사용 가능 제목 component

const CenterTitle = (props) => {

    let template = null;
    switch (props.type) {
        case "weekMealText":
            template = <Text style={styles.text}>주간 식단표</Text>
            break;
        case "loginText":
            template = <Text style={styles.text}>로그인</Text>

            break;
        case "signInText":
            template = <Text style={styles.text}>회원가입</Text>
            break;
        case "myTicketText":
            template = <Text style={styles.text}>My 식권</Text>
            break;
        case "ticketPurchaseText":
            template = <Text style={styles.text}>식권 구매하기</Text>
            break;
        case "ticketPaymentsText":
            template = <Text style={styles.text}>식권 결제</Text>
            break;
        case "findPasswordText":
            template = <Text style={styles.text}>비밀번호 찾기</Text>
            break;
        case "changePasswordText":
            template = <Text style={styles.text}>비밀번호 변경</Text>
            break;
        case "findIdText":
            template = <Text style={styles.text}>아이디 찾기</Text>
            break;
        case "userDeleteText":
            template = <Text style={styles.text}>계정 삭제</Text>
            break;
        case "buisnessInfoText":
            template = <Text style={styles.text}>사업자 정보 확인</Text>
            break;
        case "refundInfoText":
            template = <Text style={styles.text}>환불 정보</Text>
            break;
        default:
            return template
    }
    return template

}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('2.3%'),
        color: '#1F2C37',
        alignItems: "center"
    }
})

export default CenterTitle;