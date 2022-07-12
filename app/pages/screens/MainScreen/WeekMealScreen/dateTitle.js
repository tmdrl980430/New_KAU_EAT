import React, {useState} from 'react';
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



const DateTitle = () => {

    const [loading, setLoading] = useState(false)

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.dateText}>5월 4일 식단표</Text>
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