import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import BackBtn from './myPageBackBtn';
import UserTicket from './userTicket';
import UserInfoChange from './userInfoChange'
import Logout from './logout';
import {useRecoilState} from 'recoil';
import {jwtRecoilState} from '../../../../recoil';

const MyPageScreen = () => {

    const [loading, setLoading] = useState(false);
    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    console.log(`jwt : ${jwt}`);

    const logOut = () => {
        setJwt("");
        console.log(`jwt : ${jwt}`);
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
                <View style={styles.headerContainer}>
                    <BackBtn/>
                </View>
                <View style={styles.ticketContainer}>
                    <UserTicket/>
                </View>
                <View style={styles.lineView}/>
                <View style={styles.userInfoChangeContainer}>
                    <UserInfoChange/>
                </View>
                <View style={styles.lineView}/>
                <View styles={styles.logOutTextArea} onPress={logOut}>
                    <Logout/>
                </View>
            </ScrollView>
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
        backgroundColor: 'white'
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
    logOutTextArea: {
        flex: 1,
        marginTop: hp('3.7%'),
        width: wp('100%'),
        justifyContent: "center"
    }
});

export default MyPageScreen;