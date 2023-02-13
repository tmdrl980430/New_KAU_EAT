import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//재사용 가능 제목 component

const title = (props) => {

    let template = null;
    switch (props.type) {
        case "todayMealText":
            template = <View style={styles.container}>
                <View>
                    <Text style={styles.todayMealText}>오늘의 식단표</Text>
                </View>
            </View>
            break;
        case "purchaseTicketText":
            template = <View style={styles.container}>
                <View>
                    <Text style={styles.todayMealText}>식권 구매하기</Text>
                </View>
            </View>
            break;
        case "myTicketText":
            template = <View style={styles.container}>
                <View>
                    <Text style={styles.todayMealText}>My 식권</Text>
                </View>
            </View>
            break;
        case "purchasePointText":
            template = <View style={styles.container}>
                <View>
                    <Text style={styles.todayMealText}>포인트 구매하기</Text>
                </View>
            </View>
            break;
        default:
            return template
    }
    return template

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
    }
})

export default title;