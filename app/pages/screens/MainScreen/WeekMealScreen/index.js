import React, {useState} from 'react';
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
import DateList from '../../../screens/MainScreen/WeekMealScreen/dateList'
import BackBtn from '../../../../utils/backBtn/back'
import CenterTitle from '../../../../utils/title/centerTitle';
import Calendar from './dateList';
import DateTitle from './dateTitle';
import MealTable from './mealTable';

const WeekMealsScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.replace('Main')} activeOpacity={0.95}>
                            <BackBtn/>
                        </TouchableOpacity>
                        <CenterTitle type={"weekMealText"}/>
                        <View/>
                    </View>
                    <Calendar/>
                    <DateTitle/>
                    <MealTable/>
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
    safeAreaContainer: {
        backgroundColor: 'white',
        paddingBottom : hp('5%'),
    },
    container: {
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        width: wp('100%'),
        height: hp('100%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('40%'),
        alignItems: 'center'
    },
    headerContainer: {
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    }
});

export default WeekMealsScreen;