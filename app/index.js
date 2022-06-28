/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Navigation from './pages/navigation';

const Stack = createNativeStackNavigator();

const App = () => {

    return (<Navigation/>);
};

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        backgroudColor: '#fff',
        alignItems: 'center',
        justufyContent: 'center'
    }
});

export default App;
