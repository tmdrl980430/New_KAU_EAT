import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const TodayMealBtn = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.weekMeal}>주간 식단 {'>'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: hp('3%'),
        marginStart: wp('10%'),
        marginEnd: wp('10%'),
        alignItems: "center"
    },
    todayMealText: {
        fontSize: wp('5%'),
        fontFamily: 'NotoSansKR-Bold',
        color: '#12121D'
    },
    weekMeal: {
        fontSize: 14,
        fontFamily: 'NotoSansKR-Regular',
        color: 'black'

    }
});

export default TodayMealBtn;