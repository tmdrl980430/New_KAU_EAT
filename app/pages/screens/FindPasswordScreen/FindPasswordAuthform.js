import React, {useEffect, useState} from "react";
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Button
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from "recoil";
import {cefiBtnRecoilState, phoneceficonfirmmodalRecoilState, phonecefimodalRecoilState, phoneDuplicateRecoilState, phoneNumberRecoilState, severURLRecoilState} from "../../../recoil";
import Input from "../../../utils/forms/input";
import axios from 'axios';

const AuthForm = (props) => {

    const [loading, setLoading] = useState(false)

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [error, setError] = useState(null);

    const [certificationNumBtnStatus, setCertificationNumBtnStatus] = useRecoilState(
        cefiBtnRecoilState
    );

    const [phoneCefimodalState, setPhoneCefiModalState] = useRecoilState(phonecefimodalRecoilState);

    const [phoneCefiCofirmState, setPhoneCefiConfirmState] = useRecoilState(phoneceficonfirmmodalRecoilState);


    const [duplicatePhone, setDuplicatePhone] = useRecoilState(phoneDuplicateRecoilState);


    const [phoneNumInput, setPhoneNumInput] = useRecoilState(phoneNumberRecoilState);

    const [cefiing, setCefiIng] = useState(false);

    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [count, setCount] = useState(0);

    let isRunning = false;

    useEffect(() => {
        setCefiIng(false);
    },[])

    useEffect(() => {


        if(count === 180 || cefiing === true){
            const countdown = setInterval(() => {
    
                setMinute(Math.floor(count / 60));
                setSecond(count % 60);
                setCount(count - 1);
                // console.log('minute: ', minute);
                // console.log('second: ', second);
                // console.log('count: ', count);

    
                if (count <= 0) {
                    setMinute(0);
                    setSecond(0);
                    isRunning = false;
                }
    
    
            }, 1000);

            return() => clearInterval(countdown);

        }

        
    }, [count])

    useEffect(() => {
        console.log("cefiing: ", cefiing);
        console.log("certificationNumBtnStatus: ", certificationNumBtnStatus);

    }, [cefiing, certificationNumBtnStatus])

    useEffect(() => {
        if(phoneCefiCofirmState === true){

            setCertificationNumBtnStatus(true);

            if (isRunning) {
                //clearInterval(timer);
                setCefiIng(false);
    
                setCefiIng(true);
                setCount(180);
            } else {
                setCefiIng(true);
                setCount(180);
            }
        }

    }, [phoneCefiCofirmState])

    const certificationPhone = () => {

        console.log("certificationPhone", certificationNumBtnStatus);
        setPhoneCefiModalState(true);

    }


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>아이디</Text>
            <Input
                value={props.nameInput}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'default'}
                placeholder='아이디를 입력해주세요.'
                onChangeText={text => props.setIdInput(text)}/>
            <Text style={styles.titleText}>휴대폰 번호</Text>
            <View style={styles.phoneArea}>
                <View
                    style={{
                        flex: 2.5,
                        marginEnd: wp('3%')
                    }}>
                    <Input
                        value={phoneNumInput}
                        type={"textinput"}
                        autoCapitalize={'none'}
                        keyboardType={'phone-pad'}
                        secureTextEntry={false}
                        onChangeText={text => setPhoneNumInput(text)}
                        placeholder='휴대폰 번호를 입력해주세요.'></Input>
                    {
                        props.phoneNumberInputmessage === ""
                            ? (<View/>)
                            : (<Text style={styles.messagePhoneText}>{props.phoneNumberInputmessage}</Text>)
                    }
                </View>
                {
                    cefiing === false
                        ? (
                            <TouchableOpacity style={styles.button} onPress={certificationPhone} activeOpacity={0.95}>
                                <Text style={styles.buttonTitle}>인증하기</Text>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity style={styles.buttonSelect} onPress={certificationPhone} activeOpacity={0.95}>
                                <Text style={styles.buttonTitleSelect}>재요청하기</Text>
                            </TouchableOpacity>
                        )
                }
            </View>
            <Text style={styles.titleText}>인증번호 확인</Text>
            <Input
                value={props.certificationNumInput}
                type={"textinput"}
                autoCapitalize={'none'}
                keyboardType={'number-pad'}
                secureTextEntry={false}
                onChangeText={text => props.setCertificationNumInput(text)}
                placeholder='인증번호를 입력해주세요.'></Input>
            {
                props.certificationNumInputmessage === ""
                    ? (<View/>)
                    : (<Text style={styles.messageText}>{props.certificationNumInputmessage}</Text>)
            }
            {
                cefiing === false
                    ? (<View/>)
                    : (
                        <Text style={styles.cefiText}>인증번호를 발송했습니다.(유효기간 {minute}분{second}초){"\n"}인증번호가 오지 않으면 입력하신 정보가 정확한지 확인해주세요</Text>
                    )
            }

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('2%')
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
        fontSize: hp('1.6%'),
        color: '#1F2C37',
        marginTop: hp('2.5%')
    },
    button: {
        borderColor: '#ECF1F6',
        ...Platform.select({
            ios: {
                height: hp('6.2%')
            },
            android: {
                height: hp('8.5%')
            }
        }),
        borderRadius: hp('2%'),
        borderWidth: 1,
        marginTop: hp('1%'),
        flex: 1,
        justifyContent: "center"
    },
    buttonSelect: {
        borderColor: '#3D3580',
        ...Platform.select({
            ios: {
                height: hp('6.2%')
            },
            android: {
                height: hp('8.5%')
            }
        }),
        borderRadius: hp('2%'),
        borderWidth: 1,
        marginTop: hp('1%'),
        flex: 1,
        justifyContent: "center"
    },
    buttonTitle: {
        color: '#DBDBDB',
        fontFamily: 'NotoSansKR-Medium',
        fontSize: hp('1.3%'),
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center'
    },
    buttonTitleSelect: {
        color: '#3D3580',
        fontFamily: 'NotoSansKR-Medium',
        fontSize: hp('1.3%'),
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center'
    },
    phoneArea: {
        flexDirection: "row"
    },
    messageText: {
        fontFamily: 'NotoSansKR-Regular',
        marginStart: wp('4%'),
        fontSize: hp('1.3%'),
        color: '#4CD964'
    },
    messagePhoneText: {
        fontFamily: 'NotoSansKR-Regular',
        marginStart: wp('4%'),
        fontSize: hp('1.3%'),
        color: '#AAACAE'
    },
    cefiText: {
        fontFamily: 'NotoSansKR-Regular',
        marginStart: wp('4%'),
        fontSize: hp('1.3%'),
        color: '#AAACAE'
    }
})

export default AuthForm;