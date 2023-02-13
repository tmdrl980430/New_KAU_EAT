import React, {useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackBtn from '../../../../utils/backBtn/back'
import CenterTitle from '../../../../utils/title/centerTitle';
import PurchaseTable from './purchaseTable';
import PurchaseBtn from './PurchaseBtn';
import {
    merchantUidRecoilState,
    purchasePointRecoilState,
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

const PointPurchaseScreen = ({navigation}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [purchasePoint, setpurchasePoint] = useRecoilState(
        purchasePointRecoilState
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
    const [tableObject4, setTableObject4] = useState([]);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [price0, setPrice0] = useState(50000);
    const [price1, setPrice1] = useState(100000);
    const [price2, setPrice2] = useState(200000);

    let cost = (purchasePoint[0] * price0) + (purchasePoint[1] * price1) + (
        purchasePoint[2] * price2
    )

    useEffect(() => {
        setpurchasePoint([0, 0, 0])
    }, []);

    useEffect(() => {

        if (soldOutConfirmState === true) {
            navigation.replace('PurchasePointConfirmScreen')
            setSoldOutConfirmState(false);
        }

    }, [soldOutConfirmState]);

    const clickPurchase = () => {

        //품절된 식권이 있을 떄 실행을 하는 것.

        setSoldOutConfirmState(true);

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
                {soldOutConfirmmodalState != false && <SoldOutConfirmModal/>}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.replace('Main')}
                        activeOpacity={0.95}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"pointPurchaseText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <ScrollView
                    style={styles.container}
                    refreshControl={<RefreshControl
                    refreshing = {
                        refreshing
                    }
                    onRefresh = {
                        onRefresh
                    }
                    />}>
                    <PurchaseTable/>
                    <TouchableOpacity
                        style={styles.purchaseBtn}
                        onPress={clickPurchase}
                        activeOpacity={0.95}>
                        <PurchaseBtn/>
                    </TouchableOpacity>
                    <View style={styles.signuptextArea}>
                        <TouchableOpacity
                            onPress={() => navigation.push('BuisnessInfoScreen')}
                            activeOpacity={0.95}>
                            <Text style={styles.signuptext}>사업자정보확인</Text>
                        </TouchableOpacity>
                        <Text style={styles.signuptext}>
                            |
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.push('RefundInfoScreen')}
                            activeOpacity={0.95}>
                            <Text style={styles.signuptext}>환불정보</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    purchaseBtn: {
        marginTop: hp('4%'),
        marginBottom: hp('3%')
    },
    viewContainer: {
        width: wp('10%')
    },
    signuptextArea: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: hp('20%')
    },
    signuptext: {
        fontFamily: 'NotoSansKR-Black',
        color: "#AAACAE",
        fontSize: hp('1.7%')
    }
});

export default PointPurchaseScreen;