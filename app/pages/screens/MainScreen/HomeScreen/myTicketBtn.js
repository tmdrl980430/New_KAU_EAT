import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RigthArrow from '../../../../assets/images/right_arrow.png';

const MyTicketBtn = ({navigation}) => {

    return (
        <TouchableOpacity style={styles.titleArea}>
            <View>
                <Image style={styles.rightArrowImg} source={RigthArrow} resizeMode={'contain'}/>
            </View>
        </TouchableOpacity>
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
        width: wp('3.5%'),
        height: hp('1.5%'),
        resizeMode: 'center',
        marginStart: wp('2%')
    },
})

export default MyTicketBtn;