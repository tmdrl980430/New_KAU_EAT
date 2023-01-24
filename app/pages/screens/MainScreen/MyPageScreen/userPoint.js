import axios from "axios";
import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRecoilState } from "recoil";
import TicketImg from '../../../../assets/images/ticket_mypage.png';
import { jwtRecoilState, severURLRecoilState, userIdxRecoilState, userPointRecoilState } from "../../../../recoil";

const UserPoint = (props) => {


    return (
        <View style={styles.headerContainer}>
            <View style={styles.ticketContainer}>
                <Image style={styles.ticketImg} source={TicketImg} resizeMode={'contain'}/>
                <Text style={styles.countText}>유저 포인트({props.point})</Text>
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
        width: wp('5%'),
        height: hp('4%'),
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

export default UserPoint;