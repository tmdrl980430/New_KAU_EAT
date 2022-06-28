import React from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Introduction = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.introductionText}>안녕하세요!{"\n"}항식당입니다</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    introductionText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 24,
        color: '#1F2C37',
        lineHeight: 32,
        justifyContent: 'flex-start'
    },
    container: {
        marginTop: hp('5%')
    }
})

export default Introduction;