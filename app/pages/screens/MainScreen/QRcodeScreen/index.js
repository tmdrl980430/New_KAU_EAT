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

import QRCode from 'react-native-qrcode-svg';

//import RNQRGenerator from 'rn-qr-generator';

import {clickQrImgRecoilState, purchaseTicketRecoilState} from '../../../../recoil';
import {useRecoilState} from 'recoil';

const QrCodeScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false);

    const [qrcode, setQrcode] = useState('');

    const [qrInfo, setQrInfo] = useState([{userIdx : 8, ticketCount : 1, date : "2022-06-22"}]);

    const clickBtn = () => {
        setQrcode("click!!!!");
        console.log("clickBtn: ", clickBtn);


        console.log("qrInfo: ", qrInfo);


        
    }
    if (loading) {
        return (< View style = {
            styles.loading
        } > <ActivityIndicator/></View>)
    } else {
        return (
            <SafeAreaView>
                <TouchableOpacity style={styles.purchaseBtn} onPress={clickBtn}>
                    <Text>클릭</Text>
                </TouchableOpacity>
                {qrcode != '' && <QRCode value={qrInfo}/>}
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
    },
    purchaseBtn: {
        marginTop: hp('7%'),
        marginBottom: hp('10%')
    }
});

export default QrCodeScreen;