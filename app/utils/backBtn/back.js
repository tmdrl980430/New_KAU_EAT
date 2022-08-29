import React from "react";
import {StyleSheet, Image ,View} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackImg from '../../assets/images/back_btn.png'
//재사용 가능 제목 component

const back = (props) => {

    return (
        <View style={styles.viewContainer}>
            <Image style={styles.backImg} source={BackImg} resizeMode={'contain'}/>
        </View>
    )

}

const styles = StyleSheet.create({
    backImg: {
        width: wp('6%'),
        height: hp('1.5%'),
        justifyContent: 'flex-start',
        resizeMode: 'contain',
        alignItems: "center"
    },
    viewContainer: {
        width: wp('10%'),
    }
})

export default back;