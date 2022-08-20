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
    SoldOutConfirmModalRecoilState,
    SoldOutConfirmRecoilState,
    severURLRecoilState
} from '../../../../recoil';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import SoldOutConfirmModal from '../../../../utils/modal/soldoutConfirmModal';

const TicketPurchaseScreen = ({navigation}) => {

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

    let cost = (purchaseTicket[0] * 3000) + (purchaseTicket[1] * 5000) + (
        purchaseTicket[2] * 6000
    ) + (purchaseTicket[3] * 5000)

    useEffect(() => {
        setPurchaseTicket([0, 0, 0, 0]);
        getPruchaseTable();
    }, []);

    useEffect(() => {
        console.log('soldOutConfirmState: ', soldOutConfirmState);

        if (soldOutConfirmState === true) {
            navigation.replace('PurchaseConfirmScreen')
            setSoldOutConfirmState(false);
        }

    }, [soldOutConfirmState]);

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
        
        //품절된 식권이 있을 떄 실행을 하는 것.

        if(purchaseTicket[0] > 0){
            if(tableObject0.menu === null){
                setSoldOutConfirmModalState(true);
            } else {
                if(tableObject0.menu.menuStatus === "ACTIVE"){
                    setSoldOutConfirmModalState(true);
                }
            }
        }
        if(purchaseTicket[1] > 0){
            if(tableObject1.menu === null){
                setSoldOutConfirmModalState(true);
            } else {
                if(tableObject1.menu.menuStatus === "ACTIVE"){
                    setSoldOutConfirmModalState(true);
                }
            }
        }
        if(purchaseTicket[2] > 0){
            if(tableObject2.menu === null){
                setSoldOutConfirmModalState(true);
            } else {
                if(tableObject2.menu.menuStatus === "ACTIVE"){
                    setSoldOutConfirmModalState(true);
                }
            }
        }
        if(purchaseTicket[3] > 0){
            if(tableObject3.menu === null){
                setSoldOutConfirmModalState(true);
            } else {
                if(tableObject3.menu.menuStatus === "ACTIVE"){
                    setSoldOutConfirmModalState(true);
                }
            }
        }
        console.log('purchaseTicket', purchaseTicket);

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
                {soldOutConfirmmodalState != false && <SoldOutConfirmModal/>}
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