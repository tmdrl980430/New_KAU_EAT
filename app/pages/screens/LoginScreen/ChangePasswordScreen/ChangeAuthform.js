import React, {useState} from "react";
import {View, Image, Text, TextInput, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Input from "../../../../utils/forms/input";

const AuthForm = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>새 비밀번호</Text>
            <Input
                value={props.password}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'default'}
                secureTextEntry={true}
                onChangeText={(text) => props.setPasswordInput(text)}
                placeholder='새로운 비밀번호를 입력해주세요.'/> 
            {
                props.passwordInputmessage === ""
                    ? (<View/>)
                    : (<Text style={styles.messageText}>{props.passwordInputmessage}</Text>)
            }
            <Text style={styles.titleText}>새 비밀번호 확인</Text>
            <Input
                value={props.passwordCheck}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'default'}
                secureTextEntry={true}
                onChangeText={(text) => props.setPasswordCheckInput(text)}
                placeholder='새로운 비밀번호를 입력해주세요.'/> 
            {
                props.passwordCheckInputmessage === ""
                    ? (<View/>)
                    : (<Text style={styles.messageText}>{props.passwordCheckInputmessage}</Text>)
            }

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('2%')
    },
    titleText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('1.6%'),
        color: '#1F2C37',
        marginTop: 20
    },
    messageText: {
        fontFamily: 'NotoSansKR-Regular',
        marginStart: wp('4%'),
        fontSize: hp('1.3%'),
        color: '#AAACAE',
        marginTop: hp('1.4%'),
    }
})

export default AuthForm;