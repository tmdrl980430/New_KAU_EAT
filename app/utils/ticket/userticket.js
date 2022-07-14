import React, {useState} from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TicketImg from '../../assets/images/ticket_black.png';
import QrImg from '../../assets/images/qrcode.png'
import DashedLine from '../../assets/images/dashedline.png'

import axios from "axios";
import {useRecoilState} from "recoil";
import {jwtRecoilState, userIdxRecoilState} from "../../recoil";

//재사용 가능 식권 모양

const userTicket = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <View style={styles.ticketContainer}>
            <View style={styles.whitecircle}/>
            <View style={styles.ticketBoxContainer}>
                <View style={styles.ticketInfoView}>
                    <Text style={styles.menuTypeText}>{props.mealTypeName}</Text>
                    <Image style={styles.ticketImg} source={TicketImg} resizeMode={'contain'}/>
                    <Text style={styles.ticketCount}>X {props.mealTicketCount}</Text>
                </View>
                <View style={styles.qrimgContainer}>
                    <Image style={styles.dashedLine} source={DashedLine} resizeMode={'contain'}/>
                    <Image style={styles.QrImg} source={QrImg} resizeMode={'contain'}/>
                </View>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    ticketContainer: {
        flexDirection: 'row',
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        height: hp('7%'),
        width: wp('80%'),
        marginTop: hp('1%'),
        marginEnd: wp('10%'),
        alignItems: 'center'
    },
    whitecircle: {
        width: 30,
        height: 30,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        position: 'absolute',
        left: wp('-4%')
    },
    menuTypeText: {
        fontSize: 15,
        fontFamily: 'NotoSansKR-Regular',
        color: 'black',
        marginStart: wp('7%')
    },
    ticketImg: {
        width: 19,
        height: 16,
        marginStart: wp('3%')
    },
    QrImg: {
        width: 35,
        height: 35,
        marginStart: wp('3%')
    },
    dashedLine: {
        width: wp('1%'),
        height: hp('5.2%')
    },
    ticketCount: {
        fontSize: 12,
        fontFamily: 'NotoSansKR-Regular',
        color: 'black',
        marginStart: wp('1.5%')
    },
    qrimgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: wp('4%'),
    },
    ticketInfoView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ticketBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default userTicket;