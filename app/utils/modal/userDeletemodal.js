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
import CloseImg from '../../assets/images/close.png'
import {useRecoilState} from "recoil";
import axios from "axios";
import {
    userIdxRecoilState,
    jwtRecoilState,
    isLoginRecoilState,
    userDelecteModalRecoilState,
    severURLRecoilState
} from "../../recoil";

//재사용 가능 제목 component

const UserDeleteModal = (props) => {

    const [userDeleteModalState, setUserDeleteModalState] = useRecoilState(
        userDelecteModalRecoilState
    );

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [login, setLogin] = useRecoilState(isLoginRecoilState);

    const [count, setCount] = useState(1);

    const clickCancle = () => {
        setUserDeleteModalState(false);
    }

    const clickConfirm = () => {
        setUserDeleteModalState(false);
        setUserDelete();
        console.log(`jwt : ${jwt}`);
        console.log(`login : ${login}`);
        console.log('userIdx : ', userIdx)
    }

    const setUserDelete = async () => {
        console.log('setUserDelete');
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            console.log('setUserDelete_try');
            console.log(jwt);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .patch(`${IP}/users/status`, {
                    userIdx: userIdx
                }, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    if (response.data.code === 1000) {
                        setJwt('');
                        setLogin(false);
                    }
                    console.log(`userInfo response 확인 : ${response.data.code}`);

                })
                .catch((error) => {
                    console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
            console.log('setUserDelete_catch');
            console.log(e);
            setError(e);
        }
        // loading 끄기
        setLoading(false);
    };

    return (
        <Modal animationType="fade" transparent={false} visible={userDeleteModalState}>
            <View style={styles.bigmodalContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.closeContainer}>
                        <View/>
                        <TouchableOpacity
                            onPress={() => {
                                setUserDeleteModalState(false);
                                setClickKind("");
                            }}
                            activeOpacity={0.95}>
                            <Image style={styles.closeImg} source={CloseImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.descirptionText}>계정을{'\n'}식제하시겠습니까?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancleContainer}
                            onPress={clickCancle}
                            activeOpacity={0.95}>
                            <Text style={styles.cancleText}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmContainer}
                            onPress={clickConfirm}
                            activeOpacity={0.95}>
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
    buttonContainer: {
        width: wp('68%'),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: hp('5.7%'),
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

export default UserDeleteModal;