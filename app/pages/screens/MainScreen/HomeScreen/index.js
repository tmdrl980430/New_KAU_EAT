import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Image
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
import {useRecoilState} from 'recoil';
import {clickQrImgRecoilState} from '../../../../recoil';
import QRCode from 'react-native-qrcode-svg';
import TicketImg from '../../../../assets/images/ticket_black.png'
import CloseImg from '../../../../assets/images/close.png'
import Line1 from '../../../../assets/images/lineLeftTop.png'
import Line2 from '../../../../assets/images/lineRightTop.png'
import Line3 from '../../../../assets/images/lineLeftBottom.png'
import Line4 from '../../../../assets/images/lineRightBottom.png'

const HomeScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)

    const [clickKind, setClickKind] = useRecoilState(clickQrImgRecoilState);

    const [qrInfo, setQrInfo] = useState([
        {
            userIdx: 8,
            ticketCount: 1,
            date: "2022-06-22"
        }
    ]);

    const [modalState, setModalState] = useState(false);

    useEffect(() => {

        console.log("clickKind : ", clickKind);

        if (clickKind != "") {
            //navigation.replace('QrCodeScreen');
            setModalState(true)
        }

        setClickKind("");
        console.log("실행댐 : ");

    }, [clickKind]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.topContainer}>
                {
                    modalState != false && <Modal animationType="fade" transparent={false} visible={modalState}>
                            <View style={styles.bigmodalContainer}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.closeContainer}>
                                        <View/>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalState(false);
                                            }}>
                                            <Image style={styles.closeImg} source={CloseImg} resizeMode={'contain'}/>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.ticketInfoView}>
                                        <Image style={styles.ticketImg} source={TicketImg} resizeMode={'contain'}/>
                                        <Text style={styles.ticketCount}>X 2</Text>
                                    </View>
                                    <Text style={styles.menuTypeText}>중식 | 일품</Text>
                                    <View style={styles.qrCodeContainer}>
                                        <View style={styles.qrBorderContainerTop}>
                                            <Image style={styles.closeImg} source={Line1} resizeMode={'contain'}/>
                                            <Image style={styles.closeImg} source={Line2} resizeMode={'contain'}/>
                                        </View>
                                        {qrInfo != '' && <QRCode value={qrInfo} size={180}/>}
                                        <View style={styles.qrBorderContainerBottom}>
                                            <Image style={styles.closeImg} source={Line3} resizeMode={'contain'}/>
                                            <Image style={styles.closeImg} source={Line4} resizeMode={'contain'}/>
                                        </View>
                                    </View>
                                    <Text style={styles.descirptionText}>리더기에 QR 코드를 스캔하면{'\n'}사용이 완료됩니다.</Text>
                                </View>
                            </View>
                        </Modal>
                }
                <ScrollView style={styles.container}>
                    <HomeLogo style={styles.logoArea}/>
                    <View style={styles.titlecontainer}>
                        <TodayMealTitle/>
                        <TouchableOpacity onPress={() => navigation.replace('WeekMeals')}>
                            <TodayMealBtn/>
                        </TouchableOpacity>
                    </View>
                    <MealList/>
                    <TicketPurchaseTitle/>
                    <TouchableOpacity onPress={() => navigation.replace('TicketPurchase')}>
                        <TicketPurchaseBtn/>
                    </TouchableOpacity>

                    <View style={styles.titlecontainer}>
                        <MyTicketTitle/>
                        <TouchableOpacity onPress={() => navigation.replace('MyTicket')}>
                            <MyTicketBtn/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paddingContainer}>
                        <TicketList/>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: 'white'
    },
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
    },
    bigmodalContainer: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#000000A1',
        paddingBottom: hp('25%'),
        paddingTop: hp('25%'),
        paddingStart: wp('10%'),
        paddingEnd: wp('10%')
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20
    },
    ticketImg: {
        width: 18,
        height: 16
    },
    closeImg: {
        width: 16,
        height: 16
    },
    ticketCount: {
        fontSize: hp('1.5%'),
        fontFamily: 'NotoSansKR-Bold',
        color: 'black'
    },
    ticketInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('0.1%')
    },
    menuTypeText: {
        fontSize: 15,
        fontFamily: 'NotoSansKR-Bold',
        color: 'black',
        marginTop: hp('1%')
    },
    descirptionText: {
        fontSize: 15,
        fontFamily: 'NotoSansKR-Regular',
        color: '#8E8EA9',
        textAlign: 'center',
        marginTop: hp('3%'),
        marginBottom: hp('3.8%')
    },
    qrCodeContainer: {
        marginTop: hp('3%'),
        alignItems: 'center',
    },
    closeContainer: {
        width: wp('70%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: wp('3%'),
        marginEnd: wp('1.5%'),
        marginStart: wp('1.8%')
    },
    qrBorderContainerTop: {
        width: wp('60%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: wp('1.5%'),
    },
    qrBorderContainerBottom: {
        width: wp('60%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: wp('1.5%'),
    }
});

export default HomeScreen;