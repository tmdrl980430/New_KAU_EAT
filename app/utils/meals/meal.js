import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//재사용 가능 제목 component

const MealTableComponent = (props) => {

    let template = null;
    switch (props.type) {
        case "BreakfastText":
            template = <View style={styles.container}>
            <Text style={styles.text}>조식</Text>
            <View style={styles.viewContainer}>
                <Text style={styles.menuText} numberOfLines={2}>메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴</Text>
                <Text style={styles.priceText}>3,000원 {props.price}</Text>
            </View>
            <View style={styles.lineView}></View>
        </View>

            break;
        case "lunchText":
            template = <View style={styles.container}>
                <Text style={styles.text}>중식</Text>
                <View style={styles.viewContainer}>
                    <Text style={styles.menuText} numberOfLines={2}>메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴</Text>
                    <Text style={styles.priceText}>6,000원 {props.price}</Text>
                </View>
                <View style={styles.lineView}></View>
            </View>

            break;
        case "lunchㅊourseText":
            template = <View style={styles.container}>
            <Text style={styles.text}>중식 | 일품</Text>
            <View style={styles.viewContainer}>
                <Text style={styles.menuText} numberOfLines={2}>메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴</Text>
                <Text style={styles.priceText}>5,000원 {props.price}</Text>
            </View>
            <View style={styles.lineView}></View>
        </View>

            break;
        case "dinnerText":
            template = <View style={styles.container}>
            <Text style={styles.text}>석식</Text>
            <View style={styles.viewContainer}>
                <Text style={styles.menuText} numberOfLines={2}>메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴메뉴</Text>
                <Text style={styles.priceText}>5,000원 {props.price}</Text>
            </View>
            <View style={styles.lineView}></View>
        </View>

            break;
        default:
            return template
    }
    return template

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