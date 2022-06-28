import React , {useState}from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HomeLogo from './homeLogo';
import TodayMeal from './mealTable';
import MealList from './todayMeals';

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
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('30%'),
        alignItems: 'center'
    },
});

export default HomeScreen;