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
import {
    clickQrImgRecoilState,
    dateRecoilState,
    modalRecoilState,
    qrModalRecoilState,
    userIdxRecoilState,
    qrTicketCountRecoilState,
    logoutmodalRecoilState,
    jwtRecoilState,
    isLoginRecoilState,
    SoldOutConfirmModalRecoilState,
    SoldOutConfirmRecoilState
} from "../../recoil";

//재사용 가능 제목 component

const SoldOutConfirmModal = (props) => {

    const [soldOutConfirmmodalState, setSoldOutConfirmModalState] = useRecoilState(
        SoldOutConfirmModalRecoilState
    );

    const [soldOutConfirmState, setSoldOutConfirmState] = useRecoilState(
        SoldOutConfirmRecoilState
    );

    const clickCancle = () => {
        setSoldOutConfirmModalState(false);
        setSoldOutConfirmState(false);
    }

    const clickConfirm = () => {
        setSoldOutConfirmModalState(false);
        setSoldOutConfirmState(true);
    }

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={soldOutConfirmmodalState}>
            <View style={styles.bigmodalContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.closeContainer}>
                        <View/>
                        <TouchableOpacity
                            onPress={() => {
                                setLogoutModalState(false);
                                setClickKind("");
                            }} activeOpacity={0.95}>
                            <Image style={styles.closeImg} source={CloseImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.descirptionText}>품절된 식권을{'\n'}구매하시겠습니까?</Text>
                    <View style={styles.textAlignmentContainer}>
                        <Text style={styles.descirption2Text}>해당 식권은 </Text>
                        <Text style={styles.descirption2underlineText}>당일 사용이 불가능</Text>
                        <Text style={styles.descirption2Text}>합니다.</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancleContainer} onPress={clickCancle} activeOpacity={0.95}>
                            <Text style={styles.cancleText}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmContainer} onPress={clickConfirm} activeOpacity={0.95}>
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
    descirption2Text: {
        fontSize: 14,
        fontFamily: 'NotoSansKR-Regular',
        color: '#8E8EA9',
        textAlign: 'center'
    },
    descirption2underlineText: {
        fontSize: 14,
        fontFamily: 'NotoSansKR-Regular',
        color: '#8E8EA9',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    textAlignmentContainer : {
        flexDirection : 'row',
        marginTop: hp('2.2%'),

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

    buttonContainer: {
        width: wp('68%'),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: hp('4.5%'),
        marginBottom: hp('3.3%')
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
    cancleText: {
        fontSize: wp('4%'),
        fontFamily: 'NotoSansKR-Bold',
        color: 'black'
    },
    confirmText: {
        fontSize: wp('4%'),
        fontFamily: 'NotoSansKR-Bold',
        color: '#FDFDFD'
    }
})

export default SoldOutConfirmModal;