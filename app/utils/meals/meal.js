import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//재사용 가능 제목 component

const MealTableComponent = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.mealType}</Text>
            <View style={styles.viewContainer}>
                <Text style={styles.menuText} numberOfLines={2}>{props.menu}</Text>
                <Text style={styles.priceText}>{props.price}</Text>
            </View>
            <View style={styles.lineView}></View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%')
    },
    text: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('2.0%'),
        color: '#1F2C37',
        justifyContent: 'flex-start'
    },
    menuText: {
        width: wp('45%'),
        fontFamily: 'NotoSansKR-Regular',
        fontSize: hp('1.7%'),
        color: '#78828A'
    },
    viewContainer: {
        marginTop: hp('1%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    priceText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('2.1%'),
        color: '#1F2C37'
    },
    lineView: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginTop: hp('2.2%')
    }
})

export default MealTableComponent;