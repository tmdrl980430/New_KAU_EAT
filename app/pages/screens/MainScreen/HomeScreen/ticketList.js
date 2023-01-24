import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RigthArrow from '../../../../assets/images/right_arrow.png';
import Ticket from '../../../../utils/ticket/userticket';
import Point from '../../../../utils/point/userpoint';

import axios from 'axios';
import {jwtRecoilState, severURLRecoilState, userIdxRecoilState} from '../../../../recoil';
import {useRecoilState} from 'recoil';

const TicketList = (props) => {


    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [error, setError] = useState(null);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [userPoint, setUserPoint] = useState(null);
    const [ticketObject, setTicketObject] = useState([]);

    const now = new Date();

    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

    const today = String(koreaNow.getFullYear()) + '-' + String(
        koreaNow.getMonth() + 1
    ).padStart(2, '0') + '-' + String(koreaNow.getDate()).padStart(2, '0')

    useEffect(() => {
        if(props.refreshing == true) {
            getUserTicket()
        }
    },[props.refreshing])

    useEffect(() => {
        getUserTicket();
    }, [])

    const getUserTicket = async () => {
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .get(
                    `${IP}/mealtickets?userIdx=${userIdx}&date=${today}`,
                    {
                        headers: {
                            "x-access-token": jwt
                        }
                    }
                )
                .then((response) => {
                    setTicketObject(response.data.result.mealTickets)
                    setUserPoint(response.data.result.point.point)
                })
                .catch((error) => {
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
            setError(e);
        }

        // loading 끄기
        setLoading(false);

    };

    return (
        <View style={styles.container}>
            {
                ticketObject && ticketObject.map((ticket, index) => (
                    <Ticket
                        mealTypeName={ticket.name}
                        mealTypeIdx={ticket.mealTypeIdx}
                        mealTicketCount={ticket.mealTicketCount}
                        menuStatus={ticket.menuStatus}
                        key={index}/>
                ))
            }
            {
                userPoint == null ? (
                    <View/>
                ) : (
                    <Point
                        point={userPoint}/>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        marginTop: hp('1.7%'),
        paddingBottom : hp('3%')
    }
})

export default TicketList;