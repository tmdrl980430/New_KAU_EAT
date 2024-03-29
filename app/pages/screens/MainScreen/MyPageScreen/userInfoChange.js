import React, {useState} from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LockImg from '../../../../assets/images/lock.png';

const UserInfoChange = () => {

    return (
        <View style={styles.headerContainer}>
            <View style={styles.ticketContainer}>
                <Image style={styles.ticketImg} source={LockImg} resizeMode={'contain'}/>
                <Text style={styles.countText}>비밀번호 변경</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: hp('0.1%')
    },
    ticketContainer : {
        marginTop: hp('2.8%'),
        flexDirection : 'row',
        alignItems : 'center'
    },
    ticketImg: {
        width: wp('4%'),
        height: hp('3%'),
        resizeMode: 'contain'
    },
    titleText: {
        fontFamily: 'NotoSansKR-Regular',
        color: '#343434',
        fontSize: hp('1.6%'),
        lineHeight: hp('2.2%'),
        marginTop: hp('2.8%')
    },
    countText: {
        fontFamily: 'NotoSansKR-Regular',
        color: 'black',
        fontSize: hp('2%'),
        lineHeight: hp('2.4%'),
        marginStart : wp('1.8%')
    }
})

export default UserInfoChange;