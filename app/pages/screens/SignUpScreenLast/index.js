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
import SignUpBtn from "./SignUpBtn";
import BackBtn from '../../../utils/backBtn/back'
import CenterTitle from '../../../utils/title/centerTitle';
import {useRecoilState} from "recoil";
import {
    cefiBtnRecoilState,
    phoneceficonfirmmodalRecoilState,
    phonecefimodalRecoilState,
    phoneDuplicateRecoilState,
    phoneNumberRecoilState,
    severURLRecoilState
} from "../../../recoil";
import PhoneCefiModal from "../../../utils/modal/phoneCefimodal";

const SignUpLast = ({route, navigation}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false)
    const [signUp, setSignUp] = useState('');
    const [error, setError] = useState(null);

    const [duplicatePhone, setDuplicatePhone] = useRecoilState(
        phoneDuplicateRecoilState
    );

    // 전 화면에서 받아온 데이터
    const {id} = route.params.id
    const {password} = route.params.password

    const [nameInput, setNameInput] = useState('');
    //const [phoneNumInput, setPhoneNumInput] = useState('');

    const [phoneNumInput, setPhoneNumInput] = useRecoilState(
        phoneNumberRecoilState
    );

    const [certificationNumInput, setCertificationNumInput] = useState('');
    const [responseCertificationNum, setResponseCertificationNum] = useState('');
    const [certificationNumBtnStatus, setCertificationNumBtnStatus] = useRecoilState(
        cefiBtnRecoilState
    );

    const [phoneCefimodalState, setPhoneCefiModalState] = useRecoilState(
        phonecefimodalRecoilState
    );

    const [phoneCefiCofirmState, setPhoneCefiConfirmState] = useRecoilState(
        phoneceficonfirmmodalRecoilState
    );

    const [nameInputmessage, setNameInputmessage] = useState("");
    const [phoneNumberInputmessage, setPhoneNumberInputmessage] = useState("");
    const [certificationNumInputmessage, setCertificationNumInputmessage] = useState(
        ""
    );

    const phoneNumberRegex = /^(01\d{1})([0-9]{3,4})([0-9]{4})$/;

    useEffect(() => {
        setPhoneNumInput("");
        setDuplicatePhone(false);
    }, [])
    useEffect(() => {

        if (certificationNumInput != "" && responseCertificationNum != "" && certificationNumInput === responseCertificationNum) {
            setCertificationNumInputmessage("인증되었습니다.");
        } else if (certificationNumInput.length > 3 && responseCertificationNum.length > 3 && certificationNumInput !== responseCertificationNum) {
            setCertificationNumInputmessage("인증번호가 일치하지 않습니다.");
        } else if (certificationNumInput.length < 4 && responseCertificationNum.length > 3) {
            setCertificationNumInputmessage("인증번호를 입력해주세요.");
        }
    }, [certificationNumInput])

    useEffect(() => {
        if (phoneNumberRegex.test(phoneNumInput) && certificationNumBtnStatus === true && phoneCefiCofirmState == true) {


            if (duplicatePhone === true) {
                requestCertificationPhone();

                setPhoneNumberInputmessage('');
                setPhoneCefiConfirmState(false);
                setCertificationNumBtnStatus(false);
            }

        } else if (phoneNumberRegex.test(phoneNumInput) === false) {
            setCertificationNumBtnStatus(false);
            setPhoneNumberInputmessage('올바른 휴대폰 번호를 입력해주세요.');
        }

        if (phoneNumberRegex.test(phoneNumInput) === true) {
            setPhoneNumberInputmessage('휴대폰 번호 인증을 진행해주세요.');
        }

        if (certificationNumBtnStatus === false) {
            setResponseCertificationNum('');
        }

    }, [certificationNumBtnStatus, phoneNumInput])

    const requestCertificationPhone = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);

            // loading 상태를 true 로 바꿉니다.

            const response = await axios
                .post(
                    `${IP}/auth/phone`,
                    {phoneNumber: phoneNumInput}
                )
                .then((response) => {
                    setResponseCertificationNum(response.data.result.authNumber);
                    return response;
                })
                .catch((error) => {
                });
            // 데이터는 response.data.code 안에 들어있다.

        } catch (e) {
            setError(e);
        }
    };

    const fetchSignUp = async () => {


        if (certificationNumInput != "" && responseCertificationNum != "" && certificationNumInput === responseCertificationNum) {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setSignUp(" ");

                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                const response = await axios
                    .post(`${IP}/users`, {
                        id: id,
                        password: password,
                        name: nameInput,
                        phoneNumber: phoneNumInput
                    })
                    .then((response) => {

                        return response;
                    })
                    .catch((error) => {
                    });

                navigation.replace('Login');
                // 데이터는 response.data.code 안에 들어있다.
                setSignUp(response.data.code);

            } catch (e) {
                setError(e);
            }
            // loading 끄기
            setLoading(false);
        }

    };

    const onPressSignUpBtn = () => {

        fetchSignUp();
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
                        onPress={() => navigation.replace('SignUp')}
                        activeOpacity={0.95}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"signInText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <ScrollView style={styles.container}>
                    {phoneCefimodalState != false && <PhoneCefiModal/>}
                    <View style={styles.ContentsViewFlex}>
                        <View style={styles.formArea}>
                            <AuthForm
                                style={styles.formArea}
                                setNameInput={setNameInput}
                                setPhoneNumInput={setPhoneNumInput}
                                setCertificationNumInput={setCertificationNumInput}
                                nameInputmessage={nameInputmessage}
                                phoneNumberInputmessage={phoneNumberInputmessage}
                                setPhoneNumberInputmessage={setPhoneNumberInputmessage}
                                certificationNumInputmessage={certificationNumInputmessage}/>
                        </View>
                    </View>
                    <View style={styles.buttonViewFlex}>
                        <TouchableOpacity
                            onPress={onPressSignUpBtn}
                            style={styles.signUpBtn}
                            activeOpacity={0.95}>
                            <SignUpBtn/>
                        </TouchableOpacity>
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
        height: hp('150%')
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
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5
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
    signUpBtn: {
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

export default SignUpLast;