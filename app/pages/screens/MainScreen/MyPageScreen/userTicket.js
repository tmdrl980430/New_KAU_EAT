import React, {useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRecoilState } from "recoil";
import TicketImg from '../../../../assets/images/ticket_mypage.png';
import { userTicketRecoilState } from "../../../../recoil";

const UserTicket = ({navigation}) => {

    const [userTicket, setUserTicket] = useRecoilState(userTicketRecoilState);


    return (
        <View style={styles.headerContainer}>
            <Text style={styles.titleText}>유저 식권 조회</Text>
            <View style={styles.ticketContainer}>
                <Image style={styles.backImg} source={TicketImg} resizeMode={'contain'}/>
                <Text style={styles.countText}>유저 식권({userTicket})</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: hp('2.8%')
    },
    ticketContainer : {
        marginTop: hp('2.8%'),
        flexDirection : 'row',
        alignItems : 'center'
    },
    ticketImg: {
        width: 20,
        height: 16,
        resizeMode: 'contain'
    },
    titleText: {
        fontFamily: 'NotoSansKR-Regular',
        color: '#343434',
        fontSize: 14,
        lineHeight: 22,
        marginTop: hp('2.8%')
    },
    countText: {
        fontFamily: 'NotoSansKR-Regular',
        color: 'black',
        fontSize: 16,
        lineHeight: 24,
        marginStart : wp('1.8%')
    }
})

export default UserTicket;