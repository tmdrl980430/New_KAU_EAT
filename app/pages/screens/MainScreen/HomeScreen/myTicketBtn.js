import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RigthArrow from '../../../../assets/images/right_arrow.png';

const MyTicketBtn = () => {

    return (
        <View style={styles.titleArea}>
            <Image style={styles.rightArrowImg} source={RigthArrow} resizeMode={'contain'}/>
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
    rightArrowImg: {
        width: wp('4.6%'),
        height: hp('1.6%'),
        resizeMode: 'center',
        marginStart: wp('2%')
    },
    viewContainer: {
        width: wp('5%'),
        height: hp('2%')
    }
})

export default MyTicketBtn;