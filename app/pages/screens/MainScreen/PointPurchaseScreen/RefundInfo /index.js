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

const RefundInfoScreen = ({navigation}) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        activeOpacity={0.95}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"refundInfoText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <ScrollView style={styles.container}>
                    <Text style={styles.buisnessText}>서비스제공기간 : 결제 후 1개월동안 사용가능</Text>
                    <Text style={styles.buisnessText}>환불정책 : 환불 불가</Text>
                </ScrollView>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeAreaContainer: {
        backgroundColor: 'white',
        paddingBottom: hp('5%'),
        height: hp('150%')
    },
    container: {
        backgroundColor: 'white',
        paddingLeft: wp('9%'),
        paddingRight: wp('9%'),
        paddingBottom: hp('5%'),
        width: wp('100%'),
        height: hp('80%'),
        marginTop : hp('5%'),
    },
    
    headerContainer: {
        paddingLeft: wp('9%'),
        paddingRight: wp('9%'),
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    buisnessText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('1.8%'),
        color: 'black'
    },
    viewContainer: {
        width: wp('10%')
    },
});

export default RefundInfoScreen;