import React, {useState,useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    Button,
    useWindowDimensions
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { dateRecoilState } from '../../../../recoil';



const DateTitle = () => {

    const [loading, setLoading] = useState(false)
    const [date, setDate] = useRecoilState(dateRecoilState);

    const [month, setMonth] = useState("0");
    const [day, setDay] = useState("0");



    useEffect(() => {
        console.log("date" , date);

        setMonth(date.substr(5,2));
        setDay(date.substr(8,9));

        console.log("month",month);
        console.log("day",day);
    }, [date])



    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.dateText}>{month}월 {day}일 식단표</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%')
    },
    dateText : {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp("2.1%"),
        color: '#2B2D41',
    }
});

export default DateTitle;