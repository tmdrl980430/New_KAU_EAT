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
import AuthForm from "./SignUpAuthform";
import SignUpHeader from "./Header";
import Introduction from "./introduction";
import SignUpBtn from "./SignUpBtn";

const SignUp = ({navigation}) => {

    const [signUp, setSignUp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [duplicateId, setduplicateId] = useState(false);
    const [formatPassword, setformatPassword] = useState(true); //비밀번호 형식
    const [samePassword, setsamePassword] = useState(true); //비밀번호 일치



    const retrieveDuplicateId = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setSignUp(null);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            if (password != passwordCheck) {
                setsamePassword(false);
            } else if (password == passwordCheck && id != '' && password != ''){
                setsamePassword(true);
                const response = await axios.get(
                    `http://3.38.35.114/auth/duplicate-id?id=${id}`
                );
                navigation.navigate('SignUpLast', {id: {id} , password: {password}});
            }
            // 데이터는 response.data.code 안에 들어있다.
            setSignUp(response.data.code);
        } catch (e) {
            setError(e);
        }
        // loading 끄기
        setLoading(false);
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
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <SignUpHeader/>
                </TouchableOpacity>
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
                        setsamePassword={samePassword}/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={onPressNextBtn}>
                    <SignUpBtn/>
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
    loginBtn: {
        marginTop: hp('16%'),
        marginBottom: hp('4%')
    }
})

export default SignUp;