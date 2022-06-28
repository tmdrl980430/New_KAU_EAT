import React, {useState} from "react";
import {View, Image, Text, TextInput, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Input from "../../../utils/forms/input";

const AuthForm = (props) => {
    // const [inputState, setInputState] = useState({
    //     type: 'Login',
    //     action: 'Login',
    //     actionMode: '새로 등록할게요~',
    //     hasErrors: false,
    //     value: "",
    //     type: "textinput",
    //     rules: {},
    //     valid: false
    // });

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>아이디</Text>
            <Input
                value={props.emailInput}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                placeholder='이메일을 입력해주세요.'
                onChangeText={text => props.setEmailInput(text)}/>
            <Text style={styles.titleText}>비밀번호</Text>
            <Input
                value={props.passwordInput}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'default'}
                secureTextEntry={true}
                onChangeText={text => props.setPasswordInput(text)}
                placeholder='비밀번호를 입력해주세요.'/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('2%')
    },
    titleText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 14,
        color: '#1F2C37',
        marginTop: 20
    }
})



export default AuthForm;