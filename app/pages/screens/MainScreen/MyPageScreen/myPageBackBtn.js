import React, {useState} from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRecoilState } from "recoil";

import { userIdRecoilState, userNameRecoilState } from "../../../../recoil";

const BackBtn = () => {

    const [userName, setUserName] = useRecoilState(userNameRecoilState);
    const [userId, setUserId] = useRecoilState(userIdRecoilState);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.flexView}>
                <View>
                    <Text style={styles.helloText}>안녕하세요{"\n"}{userName}님</Text>
                    <Text style={styles.idText}>{userId}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: hp('25%')
    },
    helloText: {
        fontFamily: 'NotoSansKR-Bold',
        color: 'white',
        fontSize: 20,
        lineHeight: 32,
        marginTop: hp('9%')
    },
    idText: {
        fontFamily: 'NotoSansKR-Regular',
        color: 'white',
        fontSize: 12,
        lineHeight: 16,
        marginTop: hp('1.5%'),
        marginBottom: hp('4.4%')
    },
    flexView: {
        flexDirection : 'row',
        justifyContent : 'space-between',
    }

})

export default BackBtn;