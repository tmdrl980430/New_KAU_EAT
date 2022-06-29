import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import LogoImage from '../../../../assets/images/kau_logo_small.png';
import LogoText from '../../../../assets/images/logo_text.png';

const HomeLogo = () => {

    return (
        <View style={styles.logoArea}>
            <Image style={styles.kauImg} source={LogoImage} resizeMode={'contain'}/>
            <Image style={styles.kauText}  source={LogoText} resizeMode={'contain'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    logoArea: {
        marginTop: hp("3%"),
        flexDirection: "row",
        marginTop: hp('5%'),
        alignItems: "center",
        marginStart: wp('10%'),
    },
    kauImg: {
        width: 37,
        height: 38,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
        marginEnd: 6
    },
    kauText: {
        width: 54,
        height: 23,
        justifyContent: 'flex-start',
        resizeMode: 'contain'
    }
})

export default HomeLogo;