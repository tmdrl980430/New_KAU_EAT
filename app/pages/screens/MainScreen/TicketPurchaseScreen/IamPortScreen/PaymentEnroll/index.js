import React, {useState} from 'react';

import {View, Text, TextInput, StyleSheet} from 'react-native';

const BillingEnroll = ({navigation}) => {
    const [data, setData] = useState({});

    const handleChange = (text) => {
        console.group('Change');
        console.log(text);
        console.groupEnd('Change');
    };

    const handlePress = (text) => {
        console.group('Press');
        console.log(text);
        console.groupEnd('Press');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>카드번호</Text>
            <TextInput style={styles.input} onChange={handleChange} onPress={handlePress}/>

            <Text style={styles.label}>유효기간</Text>
            <TextInput style={styles.input} onChange={handleChange}/>

            <Text style={styles.label}>생년월일</Text>
            <TextInput style={styles.input} onChange={handleChange}/>

            <Text style={styles.label}>카드 비밀번호(앞 두자리)</Text>
            <TextInput style={styles.input} onChange={handleChange}/>
        </View>
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
    input: {
        width: 200,
        borderWidth: 1,
        marginBottom: 20
    },
    number_input: {},
    valid_input: {},
    birth_input: {},
    pw_input: {}
});

export default BillingEnroll;