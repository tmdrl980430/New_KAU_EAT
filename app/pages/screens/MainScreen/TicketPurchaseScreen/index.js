import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackBtn from '../../../../utils/backBtn/back'
import CenterTitle from '../../../../utils/title/centerTitle';
import PurchaseTable from './purchaseTable';
import PurchaseBtn from './PurchaseBtn';

import { purchaseTicketRecoilState } from '../../../../recoil';
import { useRecoilState } from 'recoil';

const TicketPurchaseScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );

    useEffect(() => {
        setPurchaseTicket([0, 0, 0, 0])
    }, [])

    if (loading) {
        return (< View style={
            styles.loading
        } > <ActivityIndicator /></View>)
    } else {
        return (
            <SafeAreaView SafeAreaView style={styles.safeAreaContainer}> 
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.replace('Main')}>
                            <BackBtn />
                        </TouchableOpacity>
                        < CenterTitle type={"ticketPurchaseText"} />
                        <View/>
                    </View>
                    <PurchaseTable />
                    <TouchableOpacity style={styles.purchaseBtn} onPress={() => navigation.replace('IamScreen')}>
                        <PurchaseBtn />
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