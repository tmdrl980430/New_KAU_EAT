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
import AuthForm from "./FindIdAuthform";
import FindIdNextBtn from "./NextBtn";
import BackBtn from '../../../utils/backBtn/back'
import CenterTitle from '../../../utils/title/centerTitle';
import {useRecoilState} from "recoil";
import {
    cefiBtnRecoilState,
    findIdmodalRecoilState,
    phoneceficonfirmmodalRecoilState,
    phonecefimodalRecoilState,
    phoneDuplicateRecoilState,
    phoneNumberRecoilState,
    severURLRecoilState
} from "../../../recoil";
import PhoneCefiModal from "../../../utils/modal/phoneCefimodal";
import FindIdModal from "../../../utils/modal/findIdmodal";

const FindIdScreen = ({route, navigation}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [findIdmodalState, setFindIdModalState] = useRecoilState(
        findIdmodalRecoilState
    );

    const [findId, setFindId] = useState("");

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
        console.log("certificationNumBtnStatus", certificationNumBtnStatus);

        if (certificationNumInput.length > 3 && responseCertificationNum.length > 3&& certificationNumInput === responseCertificationNum) {
            setCertificationNumInputmessage("인증되었습니다.");
        } else if ( certificationNumInput.length > 3 && responseCertificationNum.length > 3 && certificationNumInput !== responseCertificationNum){
            setCertificationNumInputmessage("인증번호가 일치하지 않습니다.");
        } else if (certificationNumInput.length < 4 && responseCertificationNum.length > 3){
            setCertificationNumInputmessage("인증번호를 입력해주세요.");
        }
    }, [certificationNumInput])

    useEffect(() => {
        console.log(phoneNumInput);
        console.log("phoneNumberRegex", phoneNumberRegex.test(phoneNumInput));
        console.log("certificationNumBtnStatus", certificationNumBtnStatus);
        if (phoneNumberRegex.test(phoneNumInput) && certificationNumBtnStatus === true && phoneCefiCofirmState == true) {

            requestCertificationPhone();

            setPhoneNumberInputmessage('');
            console.log("requestCertificationPhone 실행");
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
        console.log('requestCertificationPhone')
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
                    console.log(response);
                    setResponseCertificationNum(response.data.result.authNumber);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다.

        } catch (e) {
            setError(e);
        }
    };

    const fetchIdFind = async () => {
        console.log('fetchPasswordFind')

        if (certificationNumInput != "" && responseCertificationNum != "" && certificationNumInput === responseCertificationNum) {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                const response = await axios
                    .get(`${IP}/auth/id?phoneNumber=${phoneNumInput}`)
                    .then((response) => {
                        console.log(response);
                        if (response.data.code === 1000) {
                            console.log(response.data.code);
                            setFindId(response.data.result.id);
                            setFindIdModalState(true);
                            //아이디 알려줘야 함
                        } else if (response.data.code === 3003) {
                            setIdInputmessage("존재하지 않는 유저입니다.")
                        }
                    })
                    .catch((error) => {
                        console.log("inerror: ", error);
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
        console.log('onPressNextBtn')

        fetchIdFind();

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
                        <CenterTitle type={"findIdText"}/>
                        <View style={styles.viewContainer}/>
                    </View>
                <ScrollView style={styles.container}>

                    {findIdmodalState != false && <FindIdModal findId={findId}/>}
                    {phoneCefimodalState != false && <PhoneCefiModal/>}
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
                            certificationNumInputmessage={certificationNumInputmessage}
                            certificationNumBtnStatus={certificationNumBtnStatus}
                            setCertificationNumBtnStatus={setCertificationNumBtnStatus}/>
                    </View>
                    <TouchableOpacity
                        onPress={onPressSignUpBtn}
                        style={styles.signUpBtn}
                        activeOpacity={0.95}>
                        <FindIdNextBtn/>
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
        marginTop: hp('45%'),
        marginBottom: hp('4%')
    },
    headerContainer: {
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    viewContainer: {
        width: wp('10%')
    }
})

export default FindIdScreen;