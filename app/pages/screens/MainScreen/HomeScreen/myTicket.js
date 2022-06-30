import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RigthArrow from '../../../../assets/images/right_arrow.png';

const MyTicket = () => {

    return (
        <View style={styles.titleArea}>
            <Text style={styles.myTicketText}>MY 식권</Text>
            <View>
                <Image style={styles.rightArrowImg} source={RigthArrow} resizeMode={'contain'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleArea: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
        marginTop: hp('3%'),
        marginStart: wp('10%'),
        marginEnd: wp('10%')
    },
    myTicketText: {
        fontSize: wp('5%'),
        fontFamily: 'NotoSansKR-Bold',
        color: '#12121D'
    },
    weekMeal: {
        fontSize: 12,
        alignItems: "center"
    },
    rightArrowImg: {
        width: wp('3.5%'),
        height: hp('1.5%'),
        resizeMode: 'center',
        marginStart: wp('2%')
    },
})

export default MyTicket;