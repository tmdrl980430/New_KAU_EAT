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
import AuthForm from "./LoginAuthform";
import LoginHeader from "./Header";
import Introduction from "./introduction";
import LoginBtn from "./LoginBtn";
import {useRecoilState} from "recoil";
import {isLoginRecoilState, jwtRecoilState} from "../../../recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({
    navigation
}, props) => {

    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useRecoilState(isLoginRecoilState);

    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    useEffect(() => {
        console.log(emailInput),
        console.log(passwordInput),
        console.log(login)
    }, [emailInput, passwordInput, login])

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

        let submittedForm = {};

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setLogin(null);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .post(`http://3.38.35.114/auth/login`, {
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
                    }
                    //storeData(jwt);
                })
                .catch((error) => {
                    //console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다.

        } catch (e) {
            setError(e);
        }
        // loading 끄기
        setLoading(false);
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
            <ScrollView style={styles.container}>
                <View>
                    <LoginHeader/>
                </View>
                <View>
                    <Introduction/>
                </View>
                <View style={styles.formArea}>
                    <AuthForm
                        style={styles.formArea}
                        setEmailInput={setEmailInput}
                        setPasswordInput={setPasswordInput}/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={onPressLoginBtn}>
                    <LoginBtn/>
                </TouchableOpacity>
                <View style={styles.signuptextArea}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpLast')}>
                        <Text style={styles.signuptext}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <Text style={styles.signuptext}>
                        |
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signuptext}>회원가입</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: hp('30%')
    }
})

export default Login;