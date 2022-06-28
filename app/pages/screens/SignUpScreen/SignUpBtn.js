import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignUpBtn = () => {

    return (
        <View style={styles.buttonArea}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>다음</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonArea: {
        width: '100%',
        height: hp('6%')
    },
    button: {
        backgroundColor: "#3D3580",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp('1%')
    },
    buttonTitle: {
        color: 'white',
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 16
    }
})

export default SignUpBtn;