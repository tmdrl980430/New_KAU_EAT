import React, {useState, useEffect} from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AuthForm from "./LoginAuthform";
import LoginHeader from "./Header";
import Introduction from "./introduction";
import LoginBtn from "./LoginBtn";
import {useRecoilState} from "recoil";
import {isLoginRecoilState, jwtRecoilState, severURLRecoilState} from "../../../recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CenterTitle from "../../../utils/title/centerTitle";

const Login = ({
    navigation
}, props) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useRecoilState(isLoginRecoilState);

    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [idInputmessage, setIdInputmessage] = useState("");
    const [passwordInputmessage, setPasswordInputmessage] = useState("");

    // useEffect(() => {     console.log(emailInput), console.log(passwordInput),
    // console.log(login) }, [emailInput, passwordInput, login])

    useEffect(() => {
        storeJwt(jwt);
    }, [jwt])

    const storeJwt = async (value) => {
        try {
            await AsyncStorage.setItem(`jwt`, value)
        } catch (e) {
            // saving error
        }
    }

    const fetchLogin = async () => {
        console.log('fetchLogin');
        console.log(emailInput);
        console.log(passwordInput);
        if (emailInput === "") {
            //아이디를 입력해주세요. 출력
            setIdInputmessage('아이디를 입력해주세요.');
            return
        } else {
            setIdInputmessage('');
        }
        if (passwordInput === "") {
            setPasswordInputmessage("비밀번호를 입력해주세요.");
            return
        } else {
            setPasswordInputmessage("");

        }

        if (emailInput != "" && passwordInput != "") {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setLogin(null);

                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                const response = await axios
                    .post(`${IP}/auth/login`, {
                        id: emailInput,
                        password: passwordInput
                    })
                    .then((response) => {
                        console.log(`response jwt확인 : ${response.data.result.jwt}`);
                        console.log(`response code확인 : ${response.data.code}`);
                        if (response.data.code == 1000) {
                            setJwt(response.data.result.jwt);
                            console.log(jwt);
                            setLogin(true);
                            setEmailInput("");
                            setPasswordInput("");
                        }
                    })
                    .catch((error) => {
                        if (error.response.data.code == 3002) {
                            setPasswordInputmessage("비밀번호가 틀렸습니다.");
                            setEmailInput("");
                            setPasswordInput("");
                        } else if (error.response.data.code == 3004) {
                            setIdInputmessage("아이디가 틀렸습니다.");
                            setEmailInput("");
                            setPasswordInput("");
                        }
                    });
                // 데이터는 response.data.code 안에 들어있다.

            } catch (e) {
                setError(e);
            }
            // loading 끄기
            setLoading(false);

            setEmailInput("");
            setPasswordInput("");
        }

    };

    const onPressLoginBtn = () => {
        console.log('onPressLoginBtn')

        fetchLogin();
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <View/>
                    <CenterTitle type="loginText"/>
                    <View/>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.ContentsViewFlex}>
                        <View>
                            <Introduction/>
                        </View>
                        <View style={styles.formArea}>
                            <AuthForm
                                style={styles.formArea}
                                setEmailInput={setEmailInput}
                                setPasswordInput={setPasswordInput}
                                idInputmessage={idInputmessage}
                                passwordInputmessage={passwordInputmessage}/>
                        </View>
                    </View>
                    <View style={styles.buttonViewFlex}>
                        <TouchableOpacity
                            activeOpacity={0.95}
                            style={styles.loginBtn}
                            onPress={onPressLoginBtn}>
                            <LoginBtn/>
                        </TouchableOpacity>
                        <View style={styles.signuptextArea}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('FindIdScreen')}
                                activeOpacity={0.95}>
                                <Text style={styles.signuptext}>아이디 찾기</Text>
                            </TouchableOpacity>
                            <Text style={styles.signuptext}>
                                |
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('FindPasswordScreen')}
                                activeOpacity={0.95}>
                                <Text style={styles.signuptext}>비밀번호 찾기</Text>
                            </TouchableOpacity>
                            <Text style={styles.signuptext}>
                                |
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp')}
                                activeOpacity={0.95}>
                                <Text style={styles.signuptext}>회원가입</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }

}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: 'white',
        width: wp('100%'),
        height: hp('100%')
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        height: hp('100%')
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
    signuptextArea: {
        marginTop: hp("3%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    signuptext: {
        fontFamily: 'NotoSansKR-Black',
        color: "#AAACAE",
        fontSize: hp('1.7%')
    },
    loginBtn: {
        // marginTop : hp('25%'),
    },
    ContentsViewFlex: {
        ...Platform.select({
            ios: {
                height: hp('70%'),

            },
            android: {
                height: hp('75%'),
            }
        })
    },
    buttonViewFlex: {
        ...Platform.select({
            ios: {
                height: hp('12%'),

            },
            android: {
                height: hp('15.6%'),
            }
        })
    }
})

export default Login;
