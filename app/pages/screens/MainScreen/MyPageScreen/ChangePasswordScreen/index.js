import React, {useState, useEffect} from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Text,
    SafeAreaView,
    Button,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AuthForm from "./ChangeAuthform";
import ChangeBtn from "./ChangeBtn";
import {useRecoilState} from "recoil";
import {passwordChangemodalRecoilState, passwordChangeNavigationMainRecoilState, phoneNumberRecoilState, severURLRecoilState, userIdxRecoilState} from "../../../../../recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackBtn from '../../../../../utils/backBtn/back'
import CenterTitle from "../../../../../utils/title/centerTitle";
import PasswordChangeModal from "../../../../../utils/modal/passwordChangemodal";

const ChangePasswordScreen = ({navigation}) => {

    const [passwordInput, setPasswordInput] = useState('');
    const [passwordCheckInput, setPasswordCheckInput] = useState('');

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [phoneNumInput, setPhoneNumInput] = useRecoilState(
        phoneNumberRecoilState
    );

    const [passwordInputmessage, setPasswordInputmessage] = useState("");

    const [passwordCheckInputmessage, setPasswordCheckInputmessage] = useState(
        "비밀번호는 영문/숫자를 혼용 8~20자리 이내로 입력해주세요."
    );

    const [passwordChangemodalState, setPasswordChangeModalState] = useRecoilState(
        passwordChangemodalRecoilState
    );


    const [passwordChangeNavigationState, setPasswordChangeNavigationState] = useRecoilState(
        passwordChangeNavigationMainRecoilState
    );


    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null);

    useEffect(() => {
        setPasswordChangeNavigationState(false);
        setPasswordChangeModalState(false);
    }, [])


    useEffect(() => {
        if (passwordChangeNavigationState === true) {
            setPasswordChangeNavigationState(false);
            navigation.navigate('Main');
        }

    }, [passwordChangemodalState])

    useEffect(() => {
        setPasswordChangeModalState(false);
    }, [])

    useEffect(() => {
        setPasswordInput('');
        setPasswordCheckInput('');
    }, [])

    const patchPassword = async () => {

        if (passwordInput == "") {
            setPasswordInputmessage("비밀번호를 입력해주세요.");
        } else {
            setPasswordInputmessage('');
        }
        if (passwordCheckInput == "") {
            setPasswordCheckInputmessage("위와 동일한 비밀번호를 입력해주세요.");
        } else if (passwordRegex.test(passwordInput) !== true) {
            setPasswordInputmessage('비밀번호는 영문/숫자를 혼용 8~20자리 이내로 입력해주세요. ');
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

                            if (response.data.code == 1000) {
                                setPasswordChangeModalState(true);
                            }
                            if (response.data.code == 3007) {
                                setPasswordInputmessage("기존 비밀번호와 동일합니다.");
                            }
                        })
                        .catch((error) => {
                        });
                }
                // 데이터는 response.data.code 안에 들어있다.
            } catch (e) {
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
            <SafeAreaView style={styles.topContainer}>
                {passwordChangemodalState !== false && <PasswordChangeModal/>}

                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        activeOpacity={0.95}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"changePasswordText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <View style={styles.container}>
                    <View style={styles.ContentsViewFlex}>
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
                    </View>
                    <View style={styles.buttonViewFlex}>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={patchPassword}
                            activeOpacity={0.95}>
                            <ChangeBtn/>
                        </TouchableOpacity>
                    </View>

                </View>
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
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
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
        width: wp('10%')
    },
    ContentsViewFlex: {
        ...Platform.select({
            ios: {
                height: hp('75%'),

            },
            android: {
                height: hp('80%'),
            }
        })
    },
    buttonViewFlex: {
        ...Platform.select({
            ios: {
                height: hp('5%'),

            },
            android: {
                height: hp('15.6%'),
            }
        })
    }

})

export default ChangePasswordScreen;