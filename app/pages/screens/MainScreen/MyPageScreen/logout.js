import React, {useState} from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Logout = () => {

    const [name, setName] = useState("김승기")
    const [id, setId] = useState("rlatmdrl98")

    return (

        <View style={styles.logOutTextArea}>
            <Text style={styles.logOutText}>로그아웃</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logOutTextArea: {
        flex: 1,
        marginTop: hp('3.7%'),
        width: wp('100%'),
        justifyContent: "center"
    },
    logOutText: {
        fontFamily: 'NotoSansKR-Regular',
        color: '#AAACAE',
        fontSize: 14,
        lineHeight: 24
    }
})

export default Logout;