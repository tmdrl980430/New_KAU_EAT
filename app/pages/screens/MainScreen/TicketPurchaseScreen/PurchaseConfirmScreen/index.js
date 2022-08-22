import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackBtn from '../../../../../utils/backBtn/back'
import CenterTitle from '../../../../../utils/title/centerTitle';
import PurchaseTable from '../purchaseTable';
import PurchaseBtn from '../PurchaseBtn';
import {
    merchantUidRecoilState,
    purchaseTicketRecoilState,
    dateRecoilState,
    userIdxRecoilState,
    currentTimeRecoilState,
    jwtRecoilState,
    SoldOutConfirmModalRecoilState,
    SoldOutConfirmRecoilState,
    severURLRecoilState
} from '../../../../../recoil';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import SoldOutConfirmModal from '../../../../../utils/modal/soldoutConfirmModal';
import PaymentsTableComponent from '../../../../../utils/purchase/payments';
import PaymentsBtn from './PurchaseBtn';

const PurchaseConfirmScreen = ({navigation}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );

    const [soldOutConfirmmodalState, setSoldOutConfirmModalState] = useRecoilState(
        SoldOutConfirmModalRecoilState
    );

    const [soldOutConfirmState, setSoldOutConfirmState] = useRecoilState(
        SoldOutConfirmRecoilState
    );
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeRecoilState);

    const [date, setDate] = useRecoilState(dateRecoilState);

    const [uid, setUid] = useRecoilState(merchantUidRecoilState);

    const [tableObject0, setTableObject0] = useState([]);
    const [tableObject1, setTableObject1] = useState([]);
    const [tableObject2, setTableObject2] = useState([]);
    const [tableObject3, setTableObject3] = useState([]);

    const [ticketObject, setTicketObject] = useState([]);

    let cost = (purchaseTicket[0] * 3000) + (purchaseTicket[1] * 5000) + (
        purchaseTicket[2] * 6000
    ) + (purchaseTicket[3] * 5000)

    useEffect(() => {
        const now = new Date();

        const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
        const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
        const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

        const today = String(koreaNow.getFullYear()) + '-' + String(
            koreaNow.getMonth() + 1
        ).padStart(2, '0') + '-' + String(koreaNow.getDate()).padStart(2, '0')

        let hours = koreaNow.getHours(); //시
        let minutes = koreaNow.getMinutes(); //분
        let seconds = koreaNow.getSeconds(); //초
        let milliseconds = koreaNow.getMilliseconds(); //밀리초
        const currentTime = hours + ':' + minutes + ':' + seconds + ':' +
                milliseconds

        getPruchaseTable();

        setUid(today + '/' + currentTime + '/' + userIdx);

    }, []);

    useEffect(() => {
        console.log('uid: ', uid);
    }, [uid]);

    const getPruchaseTable = async () => {
        console.log('getPruchaseTable');
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            console.log(jwt);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .get(`${IP}/meals?date=${date}`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    console.log(`response 확인 : ${response.data.code}`);
                    setTableObject0(response.data.result[0]);
                    setTableObject1(response.data.result[1]);
                    setTableObject2(response.data.result[2]);
                    setTableObject3(response.data.result[3]);
                    setTicketObject(response.data.result);
                    console.log("조회", response.data.result[1]);
                })
                .catch((error) => {
                    console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
            console.log(e);
            setError(e);
        }
        // loading 끄기
        setLoading(false);

    };

    const clickPurchase = () => {
        postCreatePayments();

    };

    const postCreatePayments = async () => {
        console.log('postCreatePayments');
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            console.log(jwt);
            console.log(userIdx);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .post(`${IP}/payments`, {
                    userIdx: userIdx,
                    merchant_uid: uid,
                    price: cost
                }, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    console.log(`response 확인 : ${response.data.code}`);
                    if(response.data.code === 1000){
                        navigation.replace('Payment', {uid: {
                            uid
                        }})
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
            console.log("outerror", e);
            setError(e);
        }

        // loading 끄기
        setLoading(false);

    };

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.replace('Main')}
                            activeOpacity={0.95}>
                            <BackBtn/>
                        </TouchableOpacity>
                        <CenterTitle type={"ticketPaymentsText"}/>
                        <View/>
                    </View>
                    <View style={styles.tableContainer}>
                        {
                            ticketObject && ticketObject.map((ticket, index) => (
                                <PaymentsTableComponent
                                    mealTypeName={ticket.mealTypeName}
                                    menu={ticket.menu}
                                    price={ticket.price}
                                    count={purchaseTicket[index]}
                                    key={index}/>
                            ))
                        }
                    </View>
                    <View style={styles.lineView}></View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>총 결제금액</Text>
                        <Text style={styles.priceText}>{cost}원</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.purchaseBtn}
                        onPress={clickPurchase}
                        activeOpacity={0.95}>
                        <PaymentsBtn cost={cost}/>
                    </TouchableOpacity>
                </ScrollView>

            </SafeAreaView>

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
    safeAreaContainer: {
        backgroundColor: 'white',
        paddingBottom: hp('5%')
    },
    container: {
        backgroundColor: 'white',
        paddingLeft: wp('9%'),
        paddingRight: wp('9%'),
        width: wp('100%'),
        height: hp('100%')
    },
    tableContainer: {
        ...Platform.select({
            ios: {},
            android: {
                paddingStart: wp('0.5%'),
                paddingEnd: wp('4%')
            }
        })
    },
    logoArea: {
        width: '100%',
        marginTop: hp('40%'),
        alignItems: 'center'
    },
    headerContainer: {
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('2.85%')
    },
    priceText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('1.8%'),
        color: 'black'
    },
    lineView: {
        height: hp('0.2%'),
        backgroundColor: '#F4F4F4',
        marginTop: hp('3%')
    },
    purchaseBtn: {
        marginTop: hp('50%'),
        marginBottom: hp('10%')
    }
});

export default PurchaseConfirmScreen;