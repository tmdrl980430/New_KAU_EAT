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
//import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HomeLogo from './homeLogo';
import TodayMealTitle from './mealTableTitle';
import MealList from './todayMeals';
import TicketPurchaseBtn from './ticketPurchase';
import MyTicketBtn from './myTicketBtn';
import TicketList from './ticketList';
import TicketPurchaseTitle from './ticketPurchaseTitle';
import PointPurchaseTitle from './pointPurchaseTitle';
import PointPurchaseBtn from './pointPurchase';
import TodayMealBtn from './mealTableBtn';
import MyTicketTitle from './myTicketTitle'
import {useRecoilState} from 'recoil';
import {
    clickQrImgRecoilState,
    modalPointRecoilState,
    modalRecoilState,
    paymentsRecoilState,
    purchasemodalRecoilState,
    purchaseTicketRecoilState,
    qrModalRecoilState
} from '../../../../recoil';

import TicketCountModal from '../../../../utils/modal/tickeCountmodal'

import QrModal from '../../../../utils/modal/ticketmodal'
import PurchaseResultModal from '../../../../utils/modal/puschaseResultmodal';
import PointConfirmModal from '../../../../utils/modal/pointConfirmmodal';
const HomeScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)

    const [clickKind, setClickKind] = useRecoilState(clickQrImgRecoilState);

    const [modalState, setModalState] = useRecoilState(modalRecoilState);

    const [modalPointState, setModalPointState] = useRecoilState(modalPointRecoilState);

    const [qrModalState, setQeModalState] = useRecoilState(qrModalRecoilState);

    const [purchasemodalState, setPurchaseModalState] = useRecoilState(
        purchasemodalRecoilState
    );

    const [paymentsState, setPamentsState] = useRecoilState(paymentsRecoilState);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false)
        });
    }, []);

    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );

    useEffect(() => {
        setPurchaseTicket([0, 0, 0, 0, 0]);
    }, []);

    useEffect(() => {

        
        if (clickKind != "") {
            if(clickKind.mealTypeIdx == 10){
                setModalPointState(true)
            } else{
                setModalState(true);

            }
        }

    }, [clickKind]);

    useEffect(() => {

        setModalState(false);
        setQeModalState(false);
        setPamentsState(false);
        setModalPointState(false)


    }, []);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.topContainer}>
                {modalState != false && <TicketCountModal/>}
                {modalPointState != false && <PointConfirmModal/>}
                {qrModalState != false && <QrModal/>}
                {purchasemodalState != false && <PurchaseResultModal/>}
                <HomeLogo style={styles.logoArea}/>
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
                    <View style={styles.titlecontainer}>
                        <TodayMealTitle/>
                        <TouchableOpacity
                            onPress={() => navigation.push('WeekMeals')}
                            activeOpacity={0.95}>
                            <TodayMealBtn/>
                        </TouchableOpacity>
                    </View>
                    <MealList
                    refreshing={refreshing}/>
                    <TicketPurchaseTitle/>
                    <TouchableOpacity
                        onPress={() => navigation.push('TicketPurchase')}
                        activeOpacity={0.95}>
                        <TicketPurchaseBtn/>
                    </TouchableOpacity>
                    {/* <PointPurchaseTitle/>
                    <TouchableOpacity
                        onPress={() => navigation.push('PointPurchase')}
                        activeOpacity={0.95}>
                        <PointPurchaseBtn/>
                    </TouchableOpacity> */}
                    <View style={styles.titlecontainer}>
                        <MyTicketTitle/>
                        <TouchableOpacity
                            onPress={() => navigation.push('MyTicket')}
                            activeOpacity={0.95}>
                            <MyTicketBtn/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paddingContainer}>
                        <TicketList
                        refreshing={refreshing}/>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: 'white'
    },
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
    container: {
        backgroundColor: 'white'
    },
    paddingContainer: {
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        marginBottom: hp('5%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('40%'),
        alignItems: 'center'
    },
    titlecontainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    }
});

export default HomeScreen;