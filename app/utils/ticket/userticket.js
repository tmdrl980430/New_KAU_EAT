import React , {useState} from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TicketImg from '../../assets/images/ticket_black.png';
import QrImg from '../../assets/images/qrcode.png'
import DashedLine from '../../assets/images/dashedline.png'

import axios from "axios";
import { useRecoilState } from "recoil";
import { jwtRecoilState, userIdxRecoilState } from "../../recoil";

//재사용 가능 식권 모양

const userTicket = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const getMyTicket = async () => {
        //getData();

        console.log('getMyTicket');

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);


            const response = await axios
                .get(`http://3.38.35.114//mealtickets?userIdx={userIdx}`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    console.log(`response 상태 확인 : ${response.data.code}`);
                    //setIsLogin(response.data.code);
                    console.log(response.data.code);
                    console.log(response.data.result);

                    if (response.data.code === 1000) {
                        setUserIdx(response.data.result.userIdx);
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


    return (
        <View style={styles.ticketContainer}>
            <View style={styles.whitecircle}/>
            <Text style={styles.menuTypeText}>조식</Text>
            <Image style={styles.ticketImg} source={TicketImg} resizeMode={'contain'}/>
            <Text style={styles.ticketCount}>X 2</Text>
            <Image style={styles.dashedLine} source={DashedLine} resizeMode={'contain'}/>
            <Image style={styles.QrImg} source={QrImg} resizeMode={'contain'}/>

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
        left: wp('36%')
    },
    dashedLine: {
        width: wp('1%'),
        left: wp('30%'),
        height: hp('5.2%'),
    },
    ticketCount: {
        fontSize: 12,
        fontFamily: 'NotoSansKR-Regular',
        color: 'black',
        marginStart: wp('1.5%')
    }
})

export default userTicket;