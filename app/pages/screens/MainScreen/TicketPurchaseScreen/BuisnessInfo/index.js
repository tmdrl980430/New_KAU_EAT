import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackBtn from '../../../../../utils/backBtn/back'
import CenterTitle from '../../../../../utils/title/centerTitle';
import {
    severURLRecoilState
} from '../../../../../recoil';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import { TextInput } from 'react-native-paper';

const BuisnessInfoScreen = ({navigation}) => {
    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        activeOpacity={0.95}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"buisnessInfoText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <ScrollView style={styles.container}>
                    <Text style={styles.buisnessText}>대표명 : 신우철</Text>
                    <Text style={styles.buisnessText}>상호명 : 주식회사 에스피에프앤비(SP F&B)</Text>
                    <Text style={styles.buisnessText}>사업자 등록 번호 : 757-87-01988</Text>
                    <Text style={styles.buisnessText}>주소지 : 경기도 고양시 덕양구 항공대학로 76, 한국항공대학교 학생회관 1층(화전동)</Text>
                    <Text style={styles.buisnessText}>전화번호 : 010-8100-5656</Text>
                    <Text style={styles.buisnessText}>통신판매업 신고번호 :2022-고양덕양구-2081 </Text>

                </ScrollView>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeAreaContainer: {
        backgroundColor: 'white',
        paddingBottom: hp('5%'),
        height: hp('150%')
    },
    container: {
        backgroundColor: 'white',
        paddingLeft: wp('9%'),
        paddingRight: wp('9%'),
        paddingBottom: hp('5%'),
        width: wp('100%'),
        height: hp('80%'),
        marginTop : hp('5%'),
    },
    
    headerContainer: {
        paddingLeft: wp('9%'),
        paddingRight: wp('9%'),
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    buisnessText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('1.8%'),
        color: 'black'
    },
    viewContainer: {
        width: wp('10%')
    },
});

export default BuisnessInfoScreen;