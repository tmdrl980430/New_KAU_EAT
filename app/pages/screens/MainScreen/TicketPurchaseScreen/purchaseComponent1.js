import React, {useState} from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from "recoil";
import Plus from '../../../../assets/images/add_btn.png'
import Minus from '../../../../assets/images/removal_btn.png'
import {purchaseTicketRecoilState} from "../../../../recoil";

//재사용 가능 제목 component

const PurchaseComponent1 = (props) => {

    const [count, setCount] = useState(0);

    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );

    const clickPlus = () => {

        setPurchaseTicket([
            purchaseTicket[0], purchaseTicket[1] + 1,
            purchaseTicket[2],
            purchaseTicket[3],
            purchaseTicket[4]
        ]);


    }

    const clickMinus = () => {



        if (purchaseTicket[1] != 0) {
            setPurchaseTicket([
                purchaseTicket[0],
                purchaseTicket[1] -1,
                purchaseTicket[2],
                purchaseTicket[3],
                purchaseTicket[4]
            ]);
        }


    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.mealType}</Text>
            <View style={styles.viewContainer}>
            {
                    props.menu != null
                        ? (<Text style={styles.menuText} numberOfLines={1}>{props.menu.menu}</Text>)
                        : (<Text style={styles.menuText} numberOfLines={1}>휴무</Text>)
                }
            </View>
            <View style={styles.lineView}></View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{props.price}</Text>
                <View style={styles.ButtonView}>
                    <TouchableOpacity activeOpacity={0.3} onPress={clickMinus} >
                        <Image style={styles.Img} source={Minus} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{purchaseTicket[props.index]}</Text>
                    <TouchableOpacity activeOpacity={0.3} onPress={clickPlus}>
                        <Image style={styles.Img} source={Plus} resizeMode={'contain'}/>

                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%'),
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(0, 0, 0)',
                shadowOpacity: 0.15,
                shadowOffset: {
                    height: -0.5,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    text: {
        marginTop: hp('2%'),
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp('2.0%'),
        color: '#1F2C37',
        paddingStart: wp('5%'),
        paddingEnd: wp('5%'),
        justifyContent: 'flex-start'
    },
    menuText: {
        width: wp('80%'),
        fontFamily: 'NotoSansKR-Regular',
        fontSize: hp('1.7%'),
        color: '#78828A',
        paddingStart: wp('5%'),
        paddingEnd: wp('5%')
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
    priceContainer: {
        paddingStart: wp('5%'),
        paddingEnd: wp('5%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lineView: {
        height: 1,
        backgroundColor: '#F2F2F5',
        marginTop: hp('1.8%')
    },
    ButtonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    countText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: hp('2.1%'),
        color: '#666687',
        marginStart: wp('1.5%'),
        marginEnd: wp('1.5%')
    },
    Img: {
        width: wp('8%'),
        height: hp('5%'),
        justifyContent: 'flex-start',
        resizeMode: 'contain'
    }
})

export default PurchaseComponent1;