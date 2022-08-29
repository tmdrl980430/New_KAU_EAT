import React, {useState, useEffect} from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AuthForm from "./SignUpAuthform";
import SignUpHeader from "./Header";
import Introduction from "./introduction";
import SignUpBtn from "./SignUpBtn";
import BackBtn from '../../../utils/backBtn/back'
import CenterTitle from '../../../utils/title/centerTitle';
import {severURLRecoilState} from "../../../recoil";
import {useRecoilState} from "recoil";

const SignUp = ({navigation}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    const [signUp, setSignUp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [duplicateId, setduplicateId] = useState(false);
    const [formatPassword, setformatPassword] = useState(true); //비밀번호 형식
    const [samePassword, setsamePassword] = useState(true); //비밀번호 일치

    const [idInputmessage, setIdInputmessage] = useState("");
    const [passwordInputmessage, setPasswordInputmessage] = useState("");
    const [passwordcheckInputmessage, setPasswordcheckInputmessage] = useState("");

    const retrieveDuplicateId = async () => {
        if (id == "") {
            setIdInputmessage("아이디를 입력해주세요.");
            return;
        } else {
            setIdInputmessage('');
        }
        if (id.length < 6) {
            setIdInputmessage("아이디는 6자리 이상 입력해주세요.");
        }
        if (password == "") {
            setPasswordInputmessage("비밀번호를 입력해주세요.");
            return;
        } else if (passwordRegex.test(password) !== true) {
            setPasswordInputmessage('비밀번호는 영문/숫자를 혼용 8~20자리 이내로 입력해주세요.');
        } else {
            setPasswordInputmessage('');
        }
        if (passwordCheck == "") {
            setPasswordcheckInputmessage("위와 동일한 비밀번호를 입력해주세요.");
            return;
        } else {
            setPasswordcheckInputmessage('');
        }
        if (id != "" && password != "" && passwordCheck != "") {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setSignUp(null);

                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                if (password != passwordCheck) {
                    setsamePassword(false);
                    setPasswordcheckInputmessage("비밀번호가 일치하지 않습니다.");
                } else if (password == passwordCheck && id != '' && password != '') {
                    setsamePassword(true);
                    setPasswordcheckInputmessage("");
                    const response = await axios
                        .get(`${IP}/auth/duplicate-id?id=${id}`)
                        .then((response) => {
                            console.log(`response code확인 : ${response.data.code}`);
                            if (response.data.code == 1000) {
                                navigation.navigate('SignUpLast', {
                                    id: {
                                        id
                                    },
                                    password: {
                                        password
                                    }
                                });
                            }
                            if (response.data.code == 3001) {
                                setIdInputmessage("중복된 아이디입니다.");

                            }
                        })
                        .catch((error) => {});
                }
                // 데이터는 response.data.code 안에 들어있다.
                setSignUp(response.data.code);
            } catch (e) {}
            // loading 끄기
            setLoading(false);
        }

    };

    useEffect(() => {
        console.log(id),
        console.log(password),
        console.log(passwordCheck)
    }, [id, password, passwordCheck])

    const onPressNextBtn = () => {
        retrieveDuplicateId();
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
                    <TouchableOpacity
                        onPress={() => navigation.replace('Login')}
                        activeOpacity={0.95}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"signInText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <Introduction/>
                    </View>
                    <View style={styles.formArea}>
                        <AuthForm
                            style={styles.formArea}
                            setId={setId}
                            setPassword={setPassword}
                            setPasswordCheck={setPasswordCheck}
                            setduplicateId={duplicateId}
                            setformatPassword={formatPassword}
                            setsamePassword={samePassword}
                            idInputmessage={idInputmessage}
                            passwordInputmessage={passwordInputmessage}
                            passwordcheckInputmessage={passwordcheckInputmessage}/>
                    </View>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={onPressNextBtn}
                        activeOpacity={0.95}>
                        <SignUpBtn/>
                    </TouchableOpacity>
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
        paddingLeft: wp('0.5%'),
        paddingRight: wp('0.5%'),
        marginBottom: hp('0.5%'),
    },
    signuptextArea: {
        marginTop: hp("3%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    signuptext: {
        fontFamily: 'NotoSansKR-Bold',
        color: "#AAACAE",
        fontSize: 14
    },
    loginBtn: {
        marginTop: hp('16%'),
        marginBottom: hp('4%')
    },
    headerContainer: {
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    viewContainer: {
        width: wp('10%'),
    }
})

export default SignUp;