import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { clickQrImgRecoilState, modalRecoilState, qrModalRecoilState } from '../../../../recoil';
import BackBtn from '../../../../utils/backBtn/back'
import TicketCountModal from '../../../../utils/modal/tickeCountmodal';
import QrModal from '../../../../utils/modal/ticketmodal';
import CenterTitle from '../../../../utils/title/centerTitle';
import TicketList from './ticketList';

const MyTicketScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)

    const [clickKind, setClickKind] = useRecoilState(clickQrImgRecoilState);

    const [modalState, setModalState] = useRecoilState(modalRecoilState);

    const [qrModalState, setQeModalState] = useRecoilState(qrModalRecoilState);

    useEffect(() => {

        console.log("clickKind : ", clickKind);

        if (clickKind != "") {
            setModalState(true);
        }

        console.log("실행댐 : ");

    }, [clickKind]);

    useEffect(() => {

        setModalState(false);
        setQeModalState(false);

    }, []);
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                {
                    modalState != false && <TicketCountModal/>
                }
                {
                    qrModalState != false && <QrModal/>
                }
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.replace('Main')} activeOpacity={0.95}>
                            <BackBtn/>
                        </TouchableOpacity>
                        <CenterTitle type={"myTicketText"}/>
                        <View/>
                    </View>
                    <View style={styles.ticketContainer}>
                        <TicketList/>
                    </View>
                </ScrollView>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        backgroudColor: 'white',
        alignItems: 'center',
        justufyContent: 'center'
    },
    ticketContainer: {
        marginTop: hp('4%')
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeAreaContainer: {
        backgroundColor: 'white',
        paddingBottom: hp('5%')
    },
    container: {
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        width: wp('100%'),
        height: hp('100%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('40%'),
        alignItems: 'center'
    },
    headerContainer: {
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    }
});

export default MyTicketScreen;