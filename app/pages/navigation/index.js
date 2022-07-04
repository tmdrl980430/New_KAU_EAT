import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Platform} from 'react-native'
import {NavigationContainer, StackActions} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Login from "../screens/LoginScreen";
import SignUp from "../screens/SignUpScreen";
import SignUpLast from "../screens/SignUpScreenLast";
import Main from "../screens/MainScreen";
import WeekMeals from "../screens/MainScreen/WeekMealScreen";
import MyTicket from "../screens/MainScreen/MyticketScreen";
import {useRecoilState} from 'recoil';
import {isLoginRecoilState, jwtRecoilState, userIdxRecoilState} from '../../recoil';
//import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const Stack = createNativeStackNavigator()

const Navigation = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [isLogIn, setIsLogin] = useState(isLoginRecoilState);

    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem("x_access_Token")
    //         if (value !== null) {
    //             // value previously stored
    //             console.log(`local storage ${value}`);
    //             setJwt(value);
    //         }
    //     } catch (e) {
    //         console.log('local storage error');
    //         // error reading value
    //     }
    // }

    const authLogin = async () => {
        //getData();

        console.log('autoLogin');

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // axios
            //     .defaults
            //     .headers
            //     .common['x-access-token'] = {jwt}

            const response = await axios
                .get(`http://3.38.35.114/auth/jwt`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    console.log(`response 상태 확인 : ${response.data.code}`);
                    //setIsLogin(response.data.code);
                    console.log(response.data.code);
                    console.log(response.data.result.jwt);

                    if (response.data.code === 1001) {
                        setUserIdx(response.data.result.userIdx);
                        setIsLogin(true);
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    console.log(`error : ${response.data.code}`);

                    setLoading(false);

                    //console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다.
        } catch (e) {
            setError(e);
        }
        // loading 끄기
        setLoading(false);
    };

    useEffect(() => {
        console.log(`Loading : ${loading}`);
        console.log(`isLogIn : ${isLogIn}`);
        console.log(`jwt : ${jwt}`);

        if (jwt != "") {
            setLoading(true); 
            authLogin();
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
    }
});
export default Navigation