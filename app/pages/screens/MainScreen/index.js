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
import {clickQrImgRecoilState, isLoginRecoilState, mainRerenderingRecoilState} from "../../../recoil";

const Tab = createMaterialBottomTabNavigator();

const Main = ({navigation}) => {

    const [login, setLogin] = useRecoilState(isLoginRecoilState);

    const [mainRe, setMainRe] = useRecoilState(mainRerenderingRecoilState);

    useEffect(() => {
        if (mainRe === true) {
            navigation.replace('Main');
        }
        setMainRe(false);
    }, [mainRe])

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