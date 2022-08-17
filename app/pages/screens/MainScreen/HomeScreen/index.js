import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
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
import TodayMealBtn from './mealTableBtn';
import MyTicketTitle from './myTicketTitle'
import {useRecoilState} from 'recoil';
import {clickQrImgRecoilState, modalRecoilState, purchasemodalRecoilState, qrModalRecoilState} from '../../../../recoil';

import TicketCountModal from '../../../../utils/modal/tickeCountmodal'

import QrModal from '../../../../utils/modal/ticketmodal'
import PurchaseResultModal from '../../../../utils/modal/puschaseResultmodal';
const HomeScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)

    const [clickKind, setClickKind] = useRecoilState(clickQrImgRecoilState);

    const [modalState, setModalState] = useRecoilState(modalRecoilState);

    const [qrModalState, setQeModalState] = useRecoilState(qrModalRecoilState);

    const [purchasemodalState, setPurchaseModalState] = useRecoilState(purchasemodalRecoilState);


    useEffect(() => {

        console.log("clickKind : ", clickKind);

        if (clickKind != "") {
            setModalState(true);
        }

        console.log("실행댐 : ");

    }, [clickKind]);

    useEffect(() => {

        setModalState(false);
        setQeModalState(false);

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
                {
                    modalState != false && <TicketCountModal/>
                }
                {
                    qrModalState != false && <QrModal/>
                }
                {purchasemodalState != false && <PurchaseResultModal/>}

                <ScrollView style={styles.container}>
                    <HomeLogo style={styles.logoArea}/>
                    <View style={styles.titlecontainer}>
                        <TodayMealTitle/>
                        <TouchableOpacity onPress={() => navigation.replace('WeekMeals')}>
                            <TodayMealBtn/>
                        </TouchableOpacity>
                    </View>
                    <MealList/>
                    <TicketPurchaseTitle/>
                    <TouchableOpacity onPress={() => navigation.replace('TicketPurchase')}>
                        <TicketPurchaseBtn/>
                    </TouchableOpacity>

                    <View style={styles.titlecontainer}>
                        <MyTicketTitle/>
                        <TouchableOpacity onPress={() => navigation.replace('MyTicket')}>
                            <MyTicketBtn/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paddingContainer}>
                        <TicketList/>
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
        paddingRight: wp('10%')
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
    },

});

export default HomeScreen;