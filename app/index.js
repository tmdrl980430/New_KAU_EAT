/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Navigation from './pages/navigation';

import {LogBox} from "react-native";
import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    "Failed prop type",
    "Can't perform",
    "Require cycle",
    "Did not receive response to shouldStartLoad in time, defaulting to YES"
])

const Stack = createNativeStackNavigator();

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }, []);
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
