import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RigthArrow from '../../../../assets/images/right_arrow.png';
import Ticket from '../../../../utils/ticket/userticket';
import axios from 'axios';
import {jwtRecoilState, userIdxRecoilState} from '../../../../recoil';
import {useRecoilState} from 'recoil';

const TicketList = () => {

    const [loading, setLoading] = useState(false);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [error, setError] = useState(null);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [ticketObject, setTicketObject] = useState([]);

    const now = new Date();

    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

    const today = String(koreaNow.getFullYear()) + '-' + String(
        koreaNow.getMonth() + 1
    ).padStart(2, '0') + '-' + String(koreaNow.getDate()).padStart(2, '0')
    

    useEffect(() => {
        setTicketObject([]);
        getUserTicket();
    }, [])

    const getUserTicket = async () => {
        console.log('getUserTicket');
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            console.log(jwt);
            console.log(userIdx);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .get(
                    `http://3.38.35.114/mealtickets?userIdx=${userIdx}&date=${today}`,
                    {
                        headers: {
                            "x-access-token": jwt
                        }
                    }
                )
                .then((response) => {
                    console.log(`response 확인 : ${response.data.code}`);

                    if (response.data.code === 1000) {
                        setTicketObject(response.data.result.mealTickets);
                    }
                    console.log(response.data.result.mealTickets);
                })
                .catch((error) => {
                    console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
            console.log(e);
            setError(e);
        }
        console.log(ticketObject);
        // loading 끄기
        setLoading(false);

    };

    return (
        <SafeAreaView >
            {
                ticketObject && ticketObject.map((ticket, index) => (
                    <Ticket
                        mealTypeName={ticket.name}
                        mealTicketCount={ticket.mealTicketCount}
                        menuStatus={ticket.menuStatus}
                        key={index}/>
                ))
            }
        </SafeAreaView>
    )
}

export default TicketList;