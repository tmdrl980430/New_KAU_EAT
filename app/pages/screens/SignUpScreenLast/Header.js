import React from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackImage from '../../../assets/images/back_btn.png';

const SignUpHeader = () => {

    return (
        <View style={styles.headerContainer}>
            <Image style={styles.backImg} source={BackImage} resizeMode={'contain'}/>
            <Text style={styles.signUpText}>회원가입</Text>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    backImg: {
        width: 7,
        height: 14,
        justifyContent: 'flex-start',
        resizeMode: 'contain'
    },
    signUpText:{
        fontFamily: 'NotoSansKR-Black',
        fontSize: 18,
        color: '#1F2C37',
        justifyContent: 'flex-start',
    },
    headerContainer:{
        marginTop: hp('7%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    }
})

export default SignUpHeader;