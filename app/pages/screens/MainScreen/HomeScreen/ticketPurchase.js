import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MealList from './todayMeals';

const TicketPurchase = () => {

    return (
        <View style={styles.titleArea}>
            <Text style={styles.todayMealText}>식권 구매하기</Text>
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
        fontFamily: 'SFPRODISPLAY-BOLD',
        color: '#12121D'
    }
})

export default TicketPurchase ;