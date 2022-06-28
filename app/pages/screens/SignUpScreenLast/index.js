import React, { useState, useEffect } from "react";
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AuthForm from "./SignUpAuthform";
import SignUpHeader from "./Header";
import SignUpBtn from "./SignUpBtn";

const SignUpLast = ({ route, navigation }) => {

    const [loading, setLoading] = useState(false)
    const [signUp, setSignUp] = useState('');
    const [error, setError] = useState(null);

    // 전 화면에서 받아온 데이터
    const { id } = route.params.id
    const { password } = route.params.password

    const [nameInput, setNameInput] = useState('')
    const [phoneNumInput, setPhoneNumInput] = useState('')
    const [certificationNumInput, setCertificationNumInput] = useState('')

    // useEffect(() => {
    //     console.log(nameInput),
    //         console.log(phoneNumInput),
    //         console.log(id),
    //         console.log(password),
    //         console.log(signUp)
    // }, [nameInput, phoneNumInput, id, password, signUp])

    const fetchSignUp = async () => {
        console.log('fetchSignUp')
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setSignUp(" ");

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios.post(`http://3.38.35.114/users`, {
                id: id,
                password: password,
                name: nameInput,
                phoneNumber: phoneNumInput
            }).then((response) => {
                console.log(response);

                return response;
            }).catch((error) => {
                console.log(error);
            });

            navigation.replace('Login');
            // 데이터는 response.data.code 안에 들어있다.
            setSignUp(response.data.code);

        } catch (e) {
            setError(e);
        }
        // loading 끄기
        setLoading(false);
    };

    const onPressSignUpBtn = () => {
        console.log('onPressSignUpBtn')

        fetchSignUp();
    }



    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                    <SignUpHeader />
                </TouchableOpacity>
                <View style={styles.formArea}>
                    <AuthForm
                        style={styles.formArea}
                        setNameInput={setNameInput}
                        setPhoneNumInput={setPhoneNumInput} />
                </View>
                <TouchableOpacity
                    onPress={onPressSignUpBtn}
                    style={styles.signUpBtn}>
                    <SignUpBtn />
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
        alignItems: 'center'
    },
    signuptext: {
        fontFamily: 'NotoSansKR-Bold',
        color: "#AAACAE",
        fontSize: 14
    },
    signUpBtn: {
        marginTop: hp('28%'),
        marginBottom: hp('4%')
    }
})

export default SignUpLast;