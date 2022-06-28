import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const TodayMeal = () => {

    return (
        <View style={styles.titleArea}>
            <Text style={styles.todayMealText}>오늘의 식단표</Text>
            <View>
                <Text style={styles}>주간 식단 {'>'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleArea: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
        marginTop: hp('3%')
    },
    todayMealText: {
        fontSize: 20,
        fontFamily: 'NotoSansKR-Regular',
        color: '#12121D'
    },
    weekMeal: {
        fontSize: 12,
        alignItems: "center"
    }
})

export default TodayMeal;