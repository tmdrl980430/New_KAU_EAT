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
import MinusImg from '../../assets/images/minus_arrow.png'
import PlusImg from '../../assets/images/plus_arrow.png'
import CloseImg from '../../assets/images/close.png'
import {useRecoilState} from "recoil";
import {phoneceficonfirmmodalRecoilState, phonecefimodalRecoilState} from "../../recoil";

//재사용 가능 제목 component

const PhoneCefiModal = () => {

    const [phoneCefimodalState, setPhoneCefiModalState] = useRecoilState(phonecefimodalRecoilState);


    const [phoneCefiCofirmState, setPhoneCefiConfirmState] = useRecoilState(phoneceficonfirmmodalRecoilState);

    const clickCancle = () => {
        setPhoneCefiModalState(false);
    }

    const clickConfirm = () => {
        setPhoneCefiModalState(false);
        setPhoneCefiConfirmState(true);
    }

    return (
        <Modal animationType="fade" transparent={false} visible={phoneCefimodalState}>
            <View style={styles.bigmodalContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.closeContainer}>
                        <View/>
                        <TouchableOpacity
                            onPress={() => {
                                setPhoneCefiModalState(false);
                            }}>
                            <Image style={styles.closeImg} source={CloseImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.descirptionText}>인증번호를{'\n'}받으시겠습니까?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancleContainer} onPress={clickCancle} >
                            <Text style={styles.cancleText}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmContainer} onPress={clickConfirm}>
                            <Text style={styles.confirmText}>확인</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingBottom: hp('30%'),
        paddingTop: hp('30%'),
        paddingStart: wp('10%'),
        paddingEnd: wp('10%')
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20
    },
    closeImg: {
        width: 16,
        height: 16,
        marginTop: hp('2%'),
        marginEnd: wp('2%')
    },
    countImg: {
        width: wp('3%'),
        height: hp('3%')
    },
    descirptionText: {
        fontSize: 18,
        fontFamily: 'NotoSansKR-Bold',
        color: 'black',
        marginTop: hp('2.4%'),
        textAlign: 'center'
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
    ticketCountView: {
        width: wp('35%'),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('4%'),
        justifyContent: 'space-between'
    },
    ticketCount: {
        fontSize: hp('2%'),
        fontFamily: 'NotoSansKR-Bold',
        color: '#3D3580'
    },
    qrBorderContainerBottom: {
        width: wp('60%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: wp('1.5%')
    },
    buttonContainer : {
        width: wp('68%'),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: hp('5.7%'),
        marginBottom: hp('3.3%'),
    },
    cancleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('34%'),
        height: hp('4.6%'),
        backgroundColor: 'white'
    },
    confirmContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('34%'),
        height: hp('6%'),
        backgroundColor: '#3D3580',
        borderRadius: 5
    },
    cancleText : {
        fontSize: wp('4%'),
        fontFamily: 'NotoSansKR-Bold',
        color: 'black',
    },
    confirmText : {
        fontSize: wp('4%'),
        fontFamily: 'NotoSansKR-Bold',
        color: '#FDFDFD',
    }
})

export default PhoneCefiModal;