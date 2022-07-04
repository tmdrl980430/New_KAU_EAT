import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Button,
    useWindowDimensions
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const DateList = () => {

    const [loading, setLoading] = useState(false)

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TouchableOpacity styles={styles.viewContainer}>
                    <Text style={styles.dateText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity styles={styles.viewContainer}>
                    <Text style={styles.dateText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity styles={styles.viewContainer}>
                    <Text style={styles.dateText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity styles={styles.viewContainer}>
                    <Text style={styles.dateText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity styles={styles.viewContainer}>
                    <Text style={styles.dateText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity styles={styles.viewContainer}>
                    <Text style={styles.dateText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity styles={styles.viewContainer}>
                    <Text style={styles.dateText}>7</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: wp('80%'),
        height: hp('5%'),
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "#F4F4F4",
        borderRadius: 10,
        paddingStart: wp('7%'),
        paddingEnd: wp('7%'),
        paddingBottom: hp('1.5%'),
        paddingTop: hp('1.5%')
    },
    dateText: {
        color: "#9CA4AB"
    },
    viewContainer: {
        position: "absolute",
        width: wp('3%'),
        height: hp('4%'),
        backgroundColor: "#3D3580",
        borderRadius: 5,
        borderColor: "#3D3580",
        marginTop: hp('0.3%'),
        marginBottom: hp('0.3%')
    }
});

export default DateList;