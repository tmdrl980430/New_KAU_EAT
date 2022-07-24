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
        default:
            return template
    }
    return template

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: hp('3%'),
        marginStart: wp('10%'),
        marginEnd: wp('10%'),
        alignItems: "center"
    },
    text: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 18,
        color: '#1F2C37',
        justifyContent: 'flex-start'
    }
})

export default CenterTitle;