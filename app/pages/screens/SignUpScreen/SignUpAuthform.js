import React, {useState} from "react";
import {View, Image, Text, TextInput, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Input from "../../../utils/forms/input";

const AuthForm = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>아이디</Text>
            <Input
                value={props.id}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'default'}
                placeholder='아이디를 입력해주세요.'
                onChangeText={(e) => props.setId(e)}/>
            {
                props.setduplicateId ? (
                    <Text style={styles.errorText}>중복된 아이디 입니다.</Text>
                ) : (
                    <Text style={styles.errorText}></Text>
                )
            }
            <Text style={styles.titleText}>비밀번호</Text>
            <Input
                value={props.password}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'default'}
                secureTextEntry={true}
                onChangeText={(e) => props.setPassword(e)}
                placeholder='비밀번호를 입력해주세요.'/>
            {
                props.setformatPassword ? (
                    <Text style={styles.errorText}></Text>
                ) : (
                    <Text style={styles.errorText}>비밀번호 형식에 맞지 않습니다.</Text>
                )
            }
            <Text style={styles.titleText}>비밀번호 확인</Text>
            <Input
                value={props.passwordCheck}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'default'}
                secureTextEntry={true}
                onChangeText={(e) => props.setPasswordCheck(e)}
                placeholder='위에 입력한 동일한 비밀번호를 입력해주세요.'/>
            {
                props.setsamePassword ? (
                    <Text style={styles.errorText}></Text>
                ) : (
                    <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('2%')
    },
    errorText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 10,
        color: '#FF3D3D',
        marginTop: hp('0.8%'),
        paddingLeft: wp('4%')
    },
    textForm: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#DBDBDB',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5
    },
    titleText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 14,
        color: '#1F2C37',
        marginTop: 20
    }
})

export default AuthForm;