import React from 'react';
import {Text, View, StyleSheet, Image, PlatformColor} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MealList from './todayMeals';
import TicketImage from '../../../../assets/images/ticket_white.png';
import RigthArrow from '../../../../assets/images/right_arrow.png';

const TicketPurchase = () => {

    return (
        <View style={styles.titleArea}>
            <Text style={styles.todayMealText}>식권 구매하기</Text>
            <View style={styles.ticketPurchaseContainer}>
                <View style={styles.ticketImgBackgroud}>
                    <Image style={styles.ticketImg} source={TicketImage} resizeMode={'contain'}/>
                </View>
                <Text style={styles.ticketPurchaseText}>식권을 바로 구매해보세요</Text>
                <Image style={styles.rightArrowImg} source={RigthArrow} resizeMode={'contain'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleArea: {
        justifyContent: "space-between",
        flexDirection: "column",
        marginStart: wp('10%'),
        marginTop: hp('4%'),
        marginEnd: wp('10%')
    },
    todayMealText: {
        fontSize: 20,
        fontFamily: 'NotoSansKR-Bold',
        color: '#12121D'
    },
    ticketImgBackgroud: {
        backgroundColor: '#3D3580',
        borderRadius: 50,
        width: 46,
        height: 46,
        marginStart: 15,
        marginTop: 13,
        marginBottom: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ticketImg: {
        width: wp('7.5%'),
        height: hp('3.5%'),
        resizeMode: 'center'
    },
    rightArrowImg: {
        width: wp('1.5%'),
        height: hp('3%'),
        resizeMode: 'center',
        marginStart: wp('2%')
    },
    ticketPurchaseContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 12,
        marginTop: hp('1.1%'),
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(0, 0, 0)',
                shadowOpacity: 0.15,
                shadowOffset: {
                    height: -0.5,
                    width: 0
                },
            },
            android: {
                elevation: 3
            }
        })

    },
    ticketPurchaseText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        marginStart: wp('1.6%'),
        color: '#000000'
    }
})

export default TicketPurchase;