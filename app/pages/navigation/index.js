import React, {useState, useEffect} from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Platform,
    SafeAreaView,
    ScrollView
} from 'react-native'
import {NavigationContainer, StackActions} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Login from "../screens/LoginScreen";
import SignUp from "../screens/SignUpScreen";
import SignUpLast from "../screens/SignUpScreenLast";
import FindPasswordScreen from '../screens/FindPasswordScreen';
import FindIdScreen from '../screens/FindIdScreen';
import ChangePasswordScreenLogin from '../screens/LoginScreen/ChangePasswordScreen';
import ChangePasswordScreen from '../screens/MainScreen/MyPageScreen/ChangePasswordScreen';
import UserDeleteScreen from '../screens/MainScreen/MyPageScreen/UserDeleteScreen';
import Main from "../screens/MainScreen";
import WeekMeals from "../screens/MainScreen/WeekMealScreen";
import MyTicket from "../screens/MainScreen/MyticketScreen";
import TicketPurchase from "../screens/MainScreen/TicketPurchaseScreen";
import Payment from '../screens/MainScreen/TicketPurchaseScreen/Payment';
import RefundInfoScreen from '../screens/MainScreen/TicketPurchaseScreen/RefundInfo ';
import BuisnessInfoScreen from '../screens/MainScreen/TicketPurchaseScreen/BuisnessInfo';
import {useRecoilState} from 'recoil';
import {
    isLoginRecoilState,
    jwtRecoilState,
    paymentsRecoilState,
    severURLRecoilState,
    userIdxRecoilState,
    userNameRecoilState
} from '../../recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import PurchaseConfirmScreen from '../screens/MainScreen/TicketPurchaseScreen/PurchaseConfirmScreen';

const Stack = createNativeStackNavigator()

const Navigation = () => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [paymentsState, setPamentsState] = useRecoilState(paymentsRecoilState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [userName, setUserName] = useRecoilState(userNameRecoilState);

    const [isLogIn, setIsLogin] = useState(isLoginRecoilState);

    useEffect(() => {
        getJwt();
    }, [])


    const getJwt = async () => {
        try {
            const value = await AsyncStorage.getItem('jwt')
            if (value !== null) {
                // value previously stored
                setJwt(value);
            }
        } catch (e) {
            // error reading value
        }
    }


    const autoLogin = async () => {
        //getData();

        console.log('autoLogin');

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .get(`${IP}/auth/jwt`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    //setIsLogin(response.data.code);
                    if (response.data.code === 1000) {
                        setUserIdx(response.data.result.userIdx);
                        setIsLogin(true);
                        setLoading(false);
                    }

                })
                .catch((error) => {

                    setLoading(false);

                });
            // 데이터는 response.data.code 안에 들어있다.
        } catch (e) {
            setError(e);
        }
        // loading 끄기
        setLoading(false);
    };

    useEffect(() => {

        if (jwt != "") {
            setLoading(true);
            autoLogin();
            setLoading(false);

        } else if (jwt === '') {
            setLoading(true);
            setIsLogin(false);
            setLoading(false);

        }
    }, [jwt])

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <NavigationContainer>
                {paymentsState != false && <View style={styles.topContainer}></View>}
                <Stack.Navigator>
                    {
                        isLogIn
                            ? (
                                // Screens for logged in users
                                <Stack.Group
                                    screenOptions={{
                                        headerShown: false
                                    }}>
                                    <Stack.Screen name="Main" component={Main}></Stack.Screen>
                                    <Stack.Screen name="WeekMeals" component={WeekMeals}></Stack.Screen>
                                    <Stack.Screen name="MyTicket" component={MyTicket}></Stack.Screen>
                                    <Stack.Screen name="TicketPurchase" component={TicketPurchase}></Stack.Screen>
                                    <Stack.Screen name='PurchaseConfirmScreen' component={PurchaseConfirmScreen}></Stack.Screen>
                                    <Stack.Screen name='Payment' component={Payment}></Stack.Screen>
                                    <Stack.Screen name='BuisnessInfoScreen' component={BuisnessInfoScreen}></Stack.Screen>
                                    <Stack.Screen name='RefundInfoScreen' component={RefundInfoScreen}></Stack.Screen>
                                    <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen}></Stack.Screen>
                                    <Stack.Screen name="UserDeleteScreen" component={UserDeleteScreen}></Stack.Screen>

                                </Stack.Group>
                            )
                            : (
                                // Auth screens
                                <Stack.Group
                                    screenOptions={{
                                        headerShown: false
                                    }}>
                                    <Stack.Screen name="Login" component={Login} setIsLogin={setIsLogin}></Stack.Screen>
                                    <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
                                    <Stack.Screen name="SignUpLast" component={SignUpLast}></Stack.Screen>
                                    <Stack.Screen name="FindPasswordScreen" component={FindPasswordScreen}></Stack.Screen>
                                    <Stack.Screen name="FindIdScreen" component={FindIdScreen}></Stack.Screen>
                                    <Stack.Screen
                                        name="ChangePasswordScreenLogin"
                                        component={ChangePasswordScreenLogin}></Stack.Screen>
                                </Stack.Group>
                            )
                    }
                </Stack.Navigator>
            </NavigationContainer>
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
    topContainer: {
        ...Platform.select({
            ios: {
                backgroundColor: 'white',
                paddingTop: hp('3.6%')
            },
            android: {
                height: hp('0%')
            }
        })
    }
});
export default Navigation