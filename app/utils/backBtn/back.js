import React from "react";
import {StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackImg from '../../assets/images/back_btn.png'
//재사용 가능 제목 component

const back = (props) => {

    return (
        <Image style={styles.backImg} source={BackImg} resizeMode={'contain'}/>

    )

}

const styles = StyleSheet.create({
    backImg: {
        width: 7,
        height: 14,
        justifyContent: 'flex-start',
        resizeMode: 'contain'
    },
})

export default back;