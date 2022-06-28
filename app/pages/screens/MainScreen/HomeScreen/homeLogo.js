import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import LogoImage from '../../../../assets/images/kau_logo_small.png';

const HomeLogo = () => {

    return (
        <View style={styles.logoArea}>
            <Image style={styles.kauImg} source={LogoImage} resizeMode={'contain'}/>
            <Text style={styles.kauText}>항식당</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoArea: {
        marginTop: hp("3%"),
        flexDirection: "row",
        marginTop: 50,
    },
    kauImg: {
        width: 37,
        height: 38,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
        marginEnd: 6
    },
    kauText: {
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',
        marginTop: 9,
        color: '#000',
    }
})

export default HomeLogo;