import React, {useState} from "react";
import {View, Image, Text, TextInput, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Input from "../../../utils/forms/input";

const AuthForm = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>아이디</Text>
            {
                props.idInputmessage === ""
                    ? (
                        <Input
                            value={props.emailInput}
                            type={"textinput"}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                            placeholder='아이디를 입력해주세요.'
                            onChangeText={text => props.setEmailInput(text)}/>
                    )
                    : (
                        <Input
                            value={props.emailInput}
                            type={"textinputRevised"}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                            placeholder='이메일을 입력해주세요.'
                            onChangeText={text => props.setEmailInput(text)}/>
                    )
            }
            {
                props.idInputmessage === ""
                    ? (<View/>)
                    : (<Text style={styles.messageText}>{props.idInputmessage}</Text>)
            }

            <Text style={styles.titleText}>비밀번호</Text>
            {
                props.passwordInputmessage === ""
                    ? (
                        <Input
                            value={props.passwordInput}
                            type={"textinput"}
                            autoCapitalize={'none'}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            onChangeText={text => props.setPasswordInput(text)}
                            placeholder='비밀번호를 입력해주세요.'/>
                    )
                    : (
                        <Input
                            value={props.passwordInput}
                            type={"textinputRevised"}
                            autoCapitalize={'none'}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            onChangeText={text => props.setPasswordInput(text)}
                            placeholder='비밀번호를 입력해주세요.'/>
                    )
            }
            {
                props.passwordInputmessage === ""
                    ? (<View/>)
                    : (<Text style={styles.messageText}>{props.passwordInputmessage}</Text>)
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
        fontSize: 14,
        color: '#1F2C37',
        marginTop: 20
    },
    messageText: {
        fontFamily: 'NotoSansKR-Regular',
        marginStart: wp('4%'),
        fontSize: hp('1.3%'),
        color: '#FF3D3D'
    }
})

export default AuthForm;