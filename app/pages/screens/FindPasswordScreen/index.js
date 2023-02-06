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
import AuthForm from "./FindPasswordAuthform";
import FindPasswordNextBtn from "./NextBtn";
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

const FindPasswordScreen = ({route, navigation}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [idInput, setIdInput] = useState('');
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

    const [idInputmessage, setIdInputmessage] = useState("");
    const [phoneNumberInputmessage, setPhoneNumberInputmessage] = useState("");
    const [certificationNumInputmessage, setCertificationNumInputmessage] = useState(
        ""
    );

    const phoneNumberRegex = /^(01\d{1})([0-9]{3,4})([0-9]{4})$/;


    useEffect(() => {
        setPhoneNumInput("");
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

            requestCertificationPhone();

            setPhoneNumberInputmessage('');
            setPhoneCefiConfirmState(false);
            setCertificationNumBtnStatus(false);

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

    const fetchPasswordFind = async () => {

        if (certificationNumInput != "" && responseCertificationNum != "" && certificationNumInput === responseCertificationNum) {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                const response = await axios
                    .get(
                        `${IP}/auth/id?id=${idInput}&phoneNumber=${phoneNumInput}`
                    )
                    .then((response) => {
                        if (response.data.code === 1000) {

                            //비밀번호 변경화면으로 이동
                            navigation.replace('ChangePasswordScreenLogin', {phoneNumber: {
                                    phoneNumInput
                                }});
                        } else if (response.data.code === 3003) {
                            setIdInputmessage("존재하지 않는 아이디입니다.")
                        }
                    })
                    .catch((error) => {
                    });
                // 데이터는 response.data.code 안에 들어있다.

            } catch (e) {
                setError(e);
            }
            // loading 끄기
            setLoading(false);
        }

    };

    const onPressSignUpBtn = () => {

        fetchPasswordFind();
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
                    <CenterTitle type={"findPasswordText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <ScrollView style={styles.container}>
                    {phoneCefimodalState != false && <PhoneCefiModal/>}
                    <View style={styles.ContentsViewFlex}>
                        <View style={styles.formArea}>
                            <AuthForm
                                style={styles.formArea}
                                setIdInput={setIdInput}
                                setPhoneNumInput={setPhoneNumInput}
                                setCertificationNumInput={setCertificationNumInput}
                                idInputmessage={idInputmessage}
                                setIdInputmessage={setIdInputmessage}
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
                            <FindPasswordNextBtn/>
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
        fontSize: hp('1.6%')
    },
    signUpBtn: {
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
        width: wp('10%')
    },
    ContentsViewFlex: {
        ...Platform.select({
            ios: {
                height: hp('75%')
            },
            android: {
                height: hp('80%')
            }
        })
    },
    buttonViewFlex: {
        ...Platform.select({
            ios: {
                height: hp('5%')
            },
            android: {
                height: hp('15.6%')
            }
        })
    }
})

export default FindPasswordScreen;