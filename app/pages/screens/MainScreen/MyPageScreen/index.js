import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import BackBtn from './myPageBackBtn';
import UserTicket from './userTicket';
import UserInfoChange from './userInfoChange'
import {useRecoilState} from 'recoil';
import {
    isLoginRecoilState,
    jwtRecoilState,
    logoutmodalRecoilState,
    userIdRecoilState,
    userIdxRecoilState,
    userNameRecoilState,
    userTicketRecoilState
} from '../../../../recoil';
import Navigation from '../../../navigation';
import axios from 'axios';
import LogoutModal from '../../../../utils/modal/logoutmodal';

const MyPageScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);
    const [login, setLogin] = useRecoilState(isLoginRecoilState);

    const [userName, setUserName] = useRecoilState(userNameRecoilState);
    const [userId, setUserId] = useRecoilState(userIdRecoilState);
    const [userTicket, setUserTicket] = useRecoilState(userTicketRecoilState);


    const [logoutodalState, setLogoutModalState] = useRecoilState(logoutmodalRecoilState);


    console.log(`jwt : ${jwt}`);

    const logOutMadal = () => {
        setLogoutModalState(true);
        console.log(`logoutodalState : ${logoutodalState}`);
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    const getUserInfo = async () => {
        console.log('getUserInfo');
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            console.log('getUserInfo');
            console.log(jwt);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .get(`http://3.38.35.114/users/${userIdx}`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    console.log(`userInfo response 확인 : ${response.data.code}`);
                    setUserId(response.data.result.userInfo.id);
                    setUserName(response.data.result.userInfo.name);
                    setUserTicket(response.data.result.userInfo.mealTicketCount);

                })
                .catch((error) => {
                    console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
            console.log('getUserInfo_catch');
            console.log(e);
            setError(e);
        }
        // loading 끄기
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView
                style={{
                    backgroundColor: '#3D3580'
                }}>
                {logoutodalState != false && <LogoutModal/>}
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <BackBtn/>
                    </View>
                    <TouchableOpacity
                        style={styles.ticketContainer}
                        onPress={() => navigation.push('MyTicket')}>
                        <UserTicket/>
                    </TouchableOpacity>
                    <View style={styles.lineView}/>
                    <View style={styles.userInfoChangeContainer}>
                        <UserInfoChange/>
                    </View>
                    <View style={styles.lineView}/>
                    <TouchableOpacity onPress={logOutMadal}>
                        <Text style={styles.logOutText}>로그아웃</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        backgroudColor: 'white',
        alignItems: 'center',
        justufyContent: 'center'
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        height: hp('100%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('15%'),
        alignItems: 'center'
    },
    headerContainer: {
        backgroundColor: '#3D3580',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    ticketContainer: {
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    userInfoChangeContainer: {
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    lineView: {
        height: 1,
        backgroundColor: '#F2F2F5',
        marginStart: wp('10%'),
        marginEnd: wp('10%'),
        marginTop: hp('2.4%')
    },
    logOutText: {
        fontFamily: 'NotoSansKR-Regular',
        color: '#AAACAE',
        fontSize: 14,
        lineHeight: 24,
        marginTop: hp('3.7%'),
        marginStart: wp('44%'),
        justifyContent: 'center'
    }
});

export default MyPageScreen;