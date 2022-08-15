import React, {useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView
} from 'react-native';
import Payment from './Payment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const IamPortScreen = ({navigation}) => {
    // const [product, setProduct] = useState({prod_amount: '', prod_name: ''});

    // const handleChange = (text) => {
    //     console.log(text);
    // };

    // const handleBilling = () => {
    //     console.log('간편 카드 등록 결제');
    //     navigation.replace('PaymentEnroll');
    // };

    // const handlePhone = () => {
    //     console.log('핸드폰 결제');
    //     navigation.replace('Payment', {
    //         type: 'phone',
    //         digital: true
    //     });
    // };


    return (
        <SafeAreaView contentContainerStyle={styles.container}>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: hp('30%'),
        width : wp('100%'),
        height: hp('100%'),
        backgroundColor : 'white'
    },
});

export default IamPortScreen;