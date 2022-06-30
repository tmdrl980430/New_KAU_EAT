import React, {useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HomeLogo from './homeLogo';
import TodayMeal from './mealTable';
import MealList from './todayMeals';
import TicketPurchase from './ticketPurchase';
import MyTicket from './myTicket';
import TicketList from './ticketList';

const HomeScreen = () => {

    const [loading, setLoading] = useState(false)

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.container}>
                <HomeLogo style={styles.logoArea}/>
                <TodayMeal/>
                <MealList/>
                <TicketPurchase/>
                <MyTicket/>
                <TicketList/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        backgroudColor: 'white',
        alignItems: 'center',
        justufyContent: 'center'
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
    },
    paddingContainer: {
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('40%'),
        alignItems: 'center',
    }
});

export default HomeScreen;