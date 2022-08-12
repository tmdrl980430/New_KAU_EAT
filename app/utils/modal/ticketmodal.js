import React, {useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    StyledSafeAreaView,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import QRCode from 'react-native-qrcode-svg';
import TicketImg from '../../assets/images/ticket_black.png'
import CloseImg from '../../assets/images/close.png'
import Line1 from '../../assets/images/lineLeftTop.png'
import Line2 from '../../assets/images/lineRightTop.png'
import Line3 from '../../assets/images/lineLeftBottom.png'
import Line4 from '../../assets/images/lineRightBottom.png'
import {useRecoilState} from "recoil";
import {clickQrImgRecoilState, dateRecoilState, modalRecoilState, qrModalRecoilState, qrTicketCountRecoilState, userIdxRecoilState} from "../../recoil";

//재사용 가능 제목 component

const QrModal = () => {

    const [qrModalState, setQrModalState] = useRecoilState(qrModalRecoilState);

    const [qrTicketCount, setQrTicketCount] = useRecoilState(qrTicketCountRecoilState);



    const [date, setDate] = useRecoilState(dateRecoilState);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [qrInfo, setQrInfo] = useState([
        {
            userIdx: {userIdx},
            ticketCount: {qrTicketCount},
            date: {date}
        }
    ]);

    const [clickKind, setClickKind] = useRecoilState(clickQrImgRecoilState);

    return (
        <Modal animationType="fade" transparent={false} visible={qrModalState}>
            <View style={styles.bigmodalContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.closeContainer}>
                        <View/>
                        <TouchableOpacity
                            onPress={() => {
                                setQrModalState(false);
                                setClickKind("");
                            }}>
                            <Image style={styles.closeImg} source={CloseImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ticketInfoView}>
                        <Image style={styles.ticketImg} source={TicketImg} resizeMode={'contain'}/>
                        <Text style={styles.ticketCount}>X {qrTicketCount}</Text>
                    </View>
                    <Text style={styles.menuTypeText}>{clickKind.mealType}</Text>
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
    )
}

const styles = StyleSheet.create({
    bigmodalContainer: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#000000A1',
        paddingBottom: hp('25%'),
        paddingTop: hp('20%'),
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
        alignItems: 'center'
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
        marginBottom: wp('1.5%')
    },
    qrBorderContainerBottom: {
        width: wp('60%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: wp('1.5%')
    }
})

export default QrModal;