import React, {useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';

const IamProtScreen = ({navigation}) => {
    const [product, setProduct] = useState({prod_amount: '', prod_name: ''});

    const handleChange = (text) => {
        console.log(text);
    };

    const handleBilling = () => {
        console.log('간편 카드 등록 결제');
        navigation.replace('PaymentEnroll');
    };

    const handlePhone = () => {
        console.log('핸드폰 결제');
        navigation.replace('Payment', {
            type: 'phone',
            digital: true
        });
    };

    const handleCard = () => {
        console.log('카드 결제');
        navigation.replace('Payment', {type: 'card'});
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={styles.label}>상품명</Text>
                <TextInput style={styles.prod_name} onChange={handleChange}/>
                <Text style={styles.label}>가격</Text>
                <TextInput style={styles.prod_amount} onChange={handleChange}/>
            </View>
            <View>
                <Text style={styles.label}>간편 카드 등록 결제</Text>
                <TouchableOpacity style={styles.pay_billing} onPress={handleBilling}/>
            </View>
            <View>
                <TextInput style={styles.pay_title}/>
                <Text style={styles.label}>일반 결제</Text>

                <View>
                    <TouchableOpacity style={styles.pay_default} onPress={handleCard}>
                        <Text>신용카드</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.pay_default} onPress={handlePhone}>
                        <Text>휴대전화</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    label: {
        marginBottom: 10
    },
    title: {
        flex: 1,
        margin: 20
    },
    pay_btn: {
        width: 300,
        height: 50,
        margin: 10
    },
    pay_title: {
        marginBottom: 18,
        marginRight: 5
    },
    pay_billing: {
        width: 300,
        height: 200,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10
    },
    pay_default: {
        width: 200,
        height: 50,
        backgroundColor: 'white',
        marginBottom: 5
    },
    prod_name: {
        display: 'flex',
        width: 200,
        marginRight: 5,
        borderWidth: 1,
        marginBottom: 20
    },
    prod_amount: {
        display: 'flex',
        width: 200,
        marginRight: 5,
        borderWidth: 1,
        marginBottom: 20
    }
});

export default IamProtScreen;