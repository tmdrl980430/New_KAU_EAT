import React from "react";
import {StyleSheet, View, Text, Image, StyledSafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//재사용 가능 제목 component

const Modal = (props) => {

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
        default:
            return template
    }
    return template
}

const styles = StyleSheet.create({
    modelContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Modal;