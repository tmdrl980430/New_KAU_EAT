import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    Button
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HomeScreen from "./HomeScreen";
import MyPageScreen from "./MyPageScreen"
import {useRecoilState} from "recoil";
import axios from "axios";
import {clickQrImgRecoilState, isLoginRecoilState, jwtRecoilState, mainRerenderingRecoilState, severURLRecoilState, userIdxRecoilState, userNameRecoilState} from "../../../recoil";

const Tab = createMaterialBottomTabNavigator();

const Main = ({navigation}) => {

    const [login, setLogin] = useRecoilState(isLoginRecoilState);

    const [mainRe, setMainRe] = useRecoilState(mainRerenderingRecoilState);

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [userName, setUserName] = useRecoilState(userNameRecoilState);

    useEffect(() => {
        if (mainRe === true) {
            navigation.replace('Main');
        }
        setMainRe(false);
    }, [mainRe])

    useEffect(() => {
        getUserInfo();
    },[])

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
                .get(`${IP}/users/${userIdx}`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    console.log(`userInfo response 확인 : ${response.data.result.userInfo.name}`);

                    console.log(`userInfo response code 확인 : ${response.data.code}`);
                    setUserName(response.data.result.userInfo.name);
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



    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Home"
            activeColor="#3D3580"
            inactiveColor="#9CA4AB"
            barStyle={{
                backgroundColor: 'white'
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'HOME',
                    tabBarIcon: ({focused}) => focused
                        ? (
                            <Image
                                source={require("../../../assets/images/selectHome.png")}
                                style={{
                                    width: 20,
                                    height: 20
                                }}/>
                        )
                        : (
                            <Image
                                source={require("../../../assets/images/unselectHome.png")}
                                style={{
                                    width: 20,
                                    height: 20
                                }}/>
                        )
                }}/>
            <Tab.Screen
                name="MyPage"
                component={MyPageScreen}
                options={{
                    tabBarLabel: 'MY',
                    tabBarIcon: ({focused}) => focused
                        ? (
                            <Image
                                source={require("../../../assets/images/selectmypage.png")}
                                style={{
                                    width: 20,
                                    height: 20
                                }}/>
                        )
                        : (
                            <Image
                                source={require("../../../assets/images/unselectmypage.png")}
                                style={{
                                    width: 20,
                                    height: 20
                                }}/>
                        )
                }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})

export default Main;