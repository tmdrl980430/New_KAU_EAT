import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView
} from 'react-native';
//import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HomeLogo from './homeLogo';
import TodayMealTitle from './mealTableTitle';
import MealList from './todayMeals';
import TicketPurchaseBtn from './ticketPurchase';
import MyTicketBtn from './myTicketBtn';
import TicketList from './ticketList';
import TicketPurchaseTitle from './ticketPurchaseTitle';
import TodayMealBtn from './mealTableBtn';
import MyTicketTitle from './myTicketTitle'
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView
                style={{
                    backgroundColor: 'white'
                }}>
                <ScrollView style={styles.container}>
                    <HomeLogo style={styles.logoArea}/>
                    <View style={styles.titlecontainer}>
                        <TodayMealTitle/>
                        <TouchableOpacity onPress={() => navigation.navigate('WeekMeals')}>
                            <TodayMealBtn/>

                        </TouchableOpacity>
                    </View>
                    <MealList/>
                    <TicketPurchaseTitle/>
                    <TicketPurchaseBtn/>
                    <View style={styles.titlecontainer}>
                        <MyTicketTitle/>
                        <MyTicketBtn/>
                    </View>
                    <TicketList/>
                </ScrollView>
            </SafeAreaView>

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
        backgroundColor: 'white'
    },
    paddingContainer: {
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('40%'),
        alignItems: 'center'
    },
    titlecontainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    }
});

export default HomeScreen;