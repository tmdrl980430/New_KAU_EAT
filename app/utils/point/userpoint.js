import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TicketImg from '../../assets/images/ticket_black.png';
import QrImg from '../../assets/images/qrcode.png'
import DashedLine from '../../assets/images/dashedline.png'

import axios from "axios";
import {useRecoilState} from "recoil";
import {clickQrImgRecoilState, userPointRecoilState} from "../../recoil";

//재사용 가능 식권 모양

const userPoint = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const [clickKind, setClickKind] = useRecoilState(clickQrImgRecoilState);

    const now = new Date();

    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    let koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

    const [currentTime, setCurrentTime] = useState("")
    const [hour, setHour] = useState(koreaNow.getHours())
    const [minute, setmMnute] = useState(koreaNow.getMinutes())

    const [days, setDays] = useState(koreaNow.getDay());

    const [ticketUse, setTicketUse] = useState(true);

    const clickQrImg = () => {

        koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
        setHour(koreaNow.getHours());
        setmMnute(koreaNow.getMinutes());
        divideWeeks();

        // if(days){//평일일 때
        //     setWeekdayTimes();
        // } else {
        //     setWeekendTimes();
        // }

        setTicketUse(true);


        if(ticketUse){
            if (0 < props.point) {
                setClickKind(
                    {mealType: "포인트", ticketCount: 1, mealTypeIdx: 10}
                );
            }
        }
        
        setCurrentTime(hour + ':' + minute )

    }

    //평일
    const setWeekdayTimes = () => {
        //조식일 때 처리
        if (hour < 10 && hour >= 8) {
            if(hour === 8 && minute < 10){
                if(props.point < 3000){
                    setTicketUse(false);
                    return;
                } else {
                    setTicketUse(true);
                    return;
                }
            } else if(hour === 9){
                if(props.point >= 3000){
                    setTicketUse(true);
                    return;
                }
            } else {
                setTicketUse(false);
                return;
            }
        } else if (hour < 15 && hour >= 11) { //중식일 때 처리
            if (props.point >= 4500) {
                setTicketUse(true);
                return;
            } else {
                setTicketUse(false);
                return;
            }
        } else if (hour < 19 && hour >= 17) { //석식일 때 처리
            if(props.point >= 5000){
                setTicketUse(true);
                return;
            } else {
                setTicketUse(false);
                return;
            }
        }

    }

    //주말
    const setWeekendTimes = () => {

        if (props.mealTypeName === "중식 | 일품" || props.mealTypeName === "중식 | 한식" || props.mealTypeName === "중식 | 면") { //중식일 때 처리
            if(hour <= 13 && hour >= 11){
                if(hour === 11 && minute < 30){
                    setTicketUse(false);
                    return;
                } else if(hour === 11 && minute >= 30) {
                    setTicketUse(true);
                    return;
                } else if(hour === 13 && minute > 30){
                    setTicketUse(false);
                    return;
                } else if(hour === 13 && minute <= 30) {
                    setTicketUse(true);
                    return;
                } else if (hour === 12 ) {
                    setTicketUse(true);
                    return;
                } else {
                    setTicketUse(false);
                    return;
                }
            } 
        } else if (props.mealTypeName === "석식") { //석식일 때 처리
            if(hour < 19 && hour >= 17){
                setTicketUse(true);
                return;
            } else if (hour === 18 ) {
                setTicketUse(true);
                return;
            } else {
                setTicketUse(false);
                return;
            }
        }
    }
        const divideWeeks = () => {
            if (days === 0 || days === 6) {
                setDays(false);
            } else {
                setDays(true);
            }
        }

        return (
            <View style={styles.ticketContainer}>
                <View style={styles.whitecircle}/>
                <View style={styles.ticketBoxContainer}>
                    <View style={styles.ticketInfoView}>
                        <Text style={styles.menuTypeText}>포인트</Text>
                        <Image style={styles.ticketImg} source={TicketImg} resizeMode={'contain'}/> 
                        {
                            props.point === null
                                ? (<Text style={styles.ticketCount}>X 0</Text>)
                                : (<Text style={styles.ticketCount}>X {props.point}</Text>)
                        }
                    </View>
                    <View style={styles.qrimgContainer}>
                        <Image style={styles.dashedLine} source={DashedLine} resizeMode={'contain'}/>
                        <TouchableOpacity onPress={clickQrImg} activeOpacity={0.95}>
                            <Image style={styles.QrImg} source={QrImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )

    }

    const styles = StyleSheet.create({
        ticketContainer: {
            flexDirection: 'row',
            backgroundColor: "#D9D9D9",
            borderRadius: hp('1%'),
            height: hp('7%'),
            width: wp('80%'),
            marginTop: hp('1%'),
            marginEnd: wp('10%'),
            alignItems: 'center'
        },
        whitecircle: {
            width: wp('7%'),
            height: hp('3.5%'),
            backgroundColor: "white",
            borderRadius: hp('5%'),
            position: 'absolute',
            left: wp('-3%')
        },
        menuTypeText: {
            fontSize: hp('1.7%'),
            fontFamily: 'NotoSansKR-Regular',
            color: 'black',
            marginStart: wp('7%')
        },
        ticketImg: {
            width: wp('5%'),
            height: hp('1.6%'),
            marginStart: wp('3%')
        },
        QrImg: {
            width: wp('9%'),
            height: hp('6%'),
            marginStart: wp('3%')
        },
        dashedLine: {
            width: wp('1%'),
            height: hp('5.2%')
        },
        ticketCount: {
            fontSize: hp('1.5%'),
            fontFamily: 'NotoSansKR-Regular',
            color: 'black',
            marginStart: wp('1.5%')
        },
        qrimgContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginEnd: wp('4%')
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
        },
        soldoutContainer: {
            backgroundColor: '#26265180',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: hp('2%'),
            paddingStart: wp('2%'),
            paddingEnd: wp('2%'),
            paddingTop: hp('0.1%'),
            paddingBottom: hp('0.2%'),
            marginStart: wp('1.5%')
        },
        soldoutText: {
            fontSize: hp('1.4%'),
            fontFamily: 'NotoSansKR-Regular',
            color: 'white'
        }
    })

export default userPoint;