import React, {useState, useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Login from "../screens/LoginScreen";
import SignUp from "../screens/SignUpScreen";
import SignUpLast from "../screens/SignUpScreenLast";
import Main from "../screens/MainScreen";
import {useRecoilState} from 'recoil';
import {isLoginRecoilState, jwtRecoilState} from '../../recoil';
import axios from 'axios';

const Stack = createNativeStackNavigator()

const Navigation = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [isLogIn, setIsLogin] = useState(isLoginRecoilState);

    const authLogin = async () => {
        console.log('autoLogin');

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            //setLogin(null);

            // loading 상태를 true 로 바꿉니다.
            //setLoading(true);

            axios
                .defaults
                .headers
                .common['x-access-token'] = jwt
                
            const response = await axios
                .get(`http://3.38.35.114/auth/jwt`, {
                    headers : {
                        "x-access-token" : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE2NTU1NTg4NzYsImV4cCI6MTY4NzA5NDg3Nn0.A-00mT4Matep0KjJc5imo4xiXV5A2ymVfq8u5uYarc4'
                    }
                })
                .then((response) => {
                    console.log(`response 상태 확인 : ${response.data.code}`);
                    // setLogin(response.data.code); 
                    if(response.data.result.code === 1000){
                        //setIsLogin(true);
                    }
                })
                .catch((error) => {
                    //console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다.

        } catch (e) {
            setError(e);
        }
        // loading 끄기
        setLoading(false);
    };


    // if (isLogIn) {
    //     console.log("authLogin");
    //     console.log(isLogIn);
    //     authLogin();
    // }

    useEffect(() => {
        if (jwt === ''){ 
                setIsLogin(false); 
            } else {     
                setIsLogin(true);
                authLogin();
            }
    }, [jwt])


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
export default Navigation