import React, {useState, useEffect} from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AuthForm from "./ChangeAuthform";
import ChangeBtn from "./ChangeBtn";
import {useRecoilState} from "recoil";
import { phoneNumberRecoilState, severURLRecoilState, userIdxRecoilState} from "../../../../../recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackBtn from '../../../../../utils/backBtn/back'
import CenterTitle from "../../../../../utils/title/centerTitle";

const ChangePasswordScreen = ({navigation}) => {

    const [passwordInput, setPasswordInput] = useState('');
    const [passwordCheckInput, setPasswordCheckInput] = useState('');

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [phoneNumInput, setPhoneNumInput] = useRecoilState(phoneNumberRecoilState);

    const [passwordInputmessage, setPasswordInputmessage] = useState("");

    const [passwordCheckInputmessage, setPasswordCheckInputmessage] = useState(
        "영문/숫자를 혼용 8~12자리 이내로 입력해주세요."
    );

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null);

    useEffect(() => {
        setPasswordInput('');
        setPasswordCheckInput('');
    }, [])

    useEffect(() => {
        console.log('passwordInput', passwordInput);
        console.log('passwordCheckInput', passwordCheckInput);
    }, [passwordInput, passwordCheckInput])

    const patchPassword = async () => {

        console.log('patchPassword');

        console.log('passwordInput', passwordInput);
        console.log('passwordCheckInput', passwordCheckInput);        
        console.log('phoneNumber', phoneNumInput);


        if (passwordInput == "") {
            setPasswordInputmessage("비밀번호를 입력해주세요.");
        } else {
            setPasswordInputmessage('');
        }
        if (passwordCheckInput == "") {
            setPasswordCheckInputmessage("위와 동일한 비밀번호를 입력해주세요.");
        } else {
            setPasswordCheckInputmessage('영문/숫자를 혼용 8~12자리 이내로 입력해주세요.');
        }

        if (passwordInput != passwordCheckInput) {
            setPasswordCheckInputmessage("비밀번호가 일치하지 않습니다.");
        }

        if (passwordInput != "" && passwordCheckInput != "") {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                if (passwordInput == passwordCheckInput && passwordCheckInput != '' && passwordInput != '') {

                    const response = await axios
                        .patch(`${IP}/users/password`, {
                            userIdx: userIdx,
                            newPassword: passwordInput
                        })
                        .then((response) => {
                            console.log(`response code확인`, response);

                            if (response.data.code == 1000) {
                                navigation.navigate('Main');
                            }
                            if (response.data.code == 3007) {
                                setPasswordInputmessage("기존 비밀번호와 동일합니다.");
                            }
                        })
                        .catch((error) => {
                            console.log(`error : `, error);
                        });
                }
                // 데이터는 response.data.code 안에 들어있다.
            } catch (e) {
                console.log(`e : `, e);

            }
            // loading 끄기
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.replace('Main')}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"changePasswordText"}/>
                    <View/>
                </View>
                <View style={styles.formArea}>
                    <AuthForm
                        style={styles.formArea}
                        setPasswordInput={setPasswordInput}
                        passwordInput={passwordInput}
                        passwordInputmessage={passwordInputmessage}
                        setPasswordInputmessage={setPasswordInputmessage}
                        passwordCheckInput={passwordCheckInput}
                        setPasswordCheckInput={setPasswordCheckInput}
                        passwordCheckInputmessage={passwordCheckInputmessage}
                        setPasswordCheckInputmessage={setPasswordCheckInputmessage}/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={patchPassword
}>
                    <ChangeBtn/>
                </TouchableOpacity>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('15%'),
        alignItems: 'center'
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('10%')
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5
    },
    signuptextArea: {
        marginTop: hp("3%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: hp('3%')
    },
    signuptext: {
        fontFamily: 'NotoSansKR-Black',
        color: "#AAACAE",
        fontSize: 14
    },
    loginBtn: {
        marginTop: hp('43%')
    },
    headerContainer: {
        marginTop: hp('7%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    }
})

export default ChangePasswordScreen;