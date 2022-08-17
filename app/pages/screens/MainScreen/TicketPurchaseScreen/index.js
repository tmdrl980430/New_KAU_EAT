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
import BackBtn from '../../../../utils/backBtn/back'
import CenterTitle from '../../../../utils/title/centerTitle';
import PurchaseTable from './purchaseTable';
import PurchaseBtn from './PurchaseBtn';
import {
    merchantUidRecoilState,
    purchaseTicketRecoilState,
    dateRecoilState,
    userIdxRecoilState,
    currentTimeRecoilState,
    jwtRecoilState,
    SoldOutConfirmModalRecoilState
} from '../../../../recoil';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import SoldOutConfirmModal from '../../../../utils/modal/soldoutConfirmModal';


const TicketPurchaseScreen = ({navigation}) => {

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
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeRecoilState);

    const [date, setDate] = useRecoilState(dateRecoilState);

    const [uid, setUid] = useRecoilState(merchantUidRecoilState);

    let cost = (purchaseTicket[0] * 3000) + (purchaseTicket[1] * 5000) + (
        purchaseTicket[2] * 6000
    ) + (purchaseTicket[3] * 5000)

    useEffect(() => {
        setPurchaseTicket([0, 0, 0, 0]);
        setUid(date + '/' + currentTime + '/' + userIdx);
    }, []);

    useEffect(() => {
        console.log('uid: ', uid);
    }, [uid]);

    const clickPurchase = () => {
        setSoldOutConfirmModalState(true);

        // console.log('purchaseTicket', purchaseTicket);
        // postCreatePayments();
        // navigation.replace('Payment', {uid: {
        //         uid
        //     }})
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
                .post(`http://3.38.35.114/payments`, {
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
            <SafeAreaView SafeAreaView="SafeAreaView" style={styles.safeAreaContainer}>
                {
                    soldOutConfirmmodalState != false && <SoldOutConfirmModal/>
                }
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.replace('Main')}>
                            <BackBtn/>
                        </TouchableOpacity>
                        < CenterTitle type={"ticketPurchaseText"}/>
                        <View/>
                    </View>
                    <PurchaseTable/>
                    <TouchableOpacity style={styles.purchaseBtn} onPress={clickPurchase}>
                        <PurchaseBtn/>
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
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        width: wp('100%'),
        height: hp('100%')
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
    purchaseBtn: {
        marginTop: hp('7%'),
        marginBottom: hp('10%')
    }
});

export default TicketPurchaseScreen;