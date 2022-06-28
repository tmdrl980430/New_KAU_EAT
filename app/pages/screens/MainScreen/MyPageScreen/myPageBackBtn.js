import React, {useState} from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackImage from '../../../../assets/images/back_btn_white.png';

const BackBtn = () => {

    const [name, setName] = useState("김승기")
    const [id, setId] = useState("rlatmdrl98")

    return (
        <View style={styles.headerContainer}>
            <Image style={styles.backImg} source={BackImage} resizeMode={'contain'}/>
            <Text style={styles.helloText}>안녕하세요{"\n"}{name}님</Text>
            <Text style={styles.idText}>{id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    backImg: {
        width: 7,
        height: 14,
        resizeMode: 'contain',
        marginTop: hp('7%'),
    },
    headerContainer: {
    },
    helloText : {
        fontFamily : 'NotoSansKR-Medium',
        color: 'white',
        fontSize : 20,
        lineHeight: 32,
        marginTop : hp('4.5%')
    },
    idText : {
        fontFamily : 'NotoSansKR-Medium',
        color: 'white',
        fontSize : 12,
        lineHeight: 16,
        marginTop : hp('1.5%'),
        marginBottom : hp('4.4%')
    }
})

export default BackBtn;