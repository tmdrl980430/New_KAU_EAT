import React, {useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from 'recoil';
import {clickQrImgRecoilState, modalRecoilState, qrModalRecoilState} from '../../../../recoil';
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

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {

        if (clickKind != "") {
            setModalState(true);
        }

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
                {modalState != false && <TicketCountModal/>}
                {qrModalState != false && <QrModal/>}
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        activeOpacity={0.95}>
                        <BackBtn/>
                    </TouchableOpacity>
                    <CenterTitle type={"myTicketText"}/>
                    <View style={styles.viewContainer}/>
                </View>
                <ScrollView
                    style={styles.container}
                    refreshControl={<RefreshControl
                    refreshing = {
                        refreshing
                    }
                    onRefresh = {
                        onRefresh
                    }
                    />}>
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
        marginTop: hp('1%'),
        marginBottom: hp('15%')
    },
    loading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeAreaContainer: {
        backgroundColor: 'white',
    },
    container: {
        backgroundColor: 'white',
        padding: wp('10%'),
        paddingEnd: wp('0%'),
        width: wp('100%'),
        height: hp('100%')
    },
    logoArea: {
        width: '100%',
        marginTop: hp('40%'),
        alignItems: 'center'
    },
    headerContainer: {
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    viewContainer: {
        width: wp('10%')
    }
});

export default MyTicketScreen;