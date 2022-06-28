import React from "react";
import {TextInput, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//재사용 가능 InputText

const input = (props) => {

    let template = null;
    switch (props.type) {
        case "textinput":
            template = <TextInput style={styles.textForm} {...props}/>
            break;
        case "textinputRevised":
            template = <TextInput style={styles.textFormRevised} {...props}/>
            break;
        case "signUpTextInput":
            template = <TextInput style={styles.textSignUpInput} {...props}/>
            break;
        default:
            return template
    }
    return template

}

const styles = StyleSheet.create({
    textForm: {
        borderColor: '#ECF1F6',
        borderRadius: 20,
        borderWidth: 1,
        paddingStart: 16,
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: hp('1%'),
        fontFamily: 'NotoSansKR-Thin',
        fontSize : 12
    },
    textFormRevised: {
        borderColor: '#FF3D3D',
        borderRadius: 20,
        borderWidth: 1,
        paddingStart: 14,
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: hp('1%'),
        fontFamily: 'NotoSansKR-Thin',
        fontSize : 12
    },
    textSignUpInput: {
        borderColor: '#ECF1F6',
        borderRadius: 20,
        borderWidth: 1,
        paddingStart: 16,
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: hp('1%'),
        fontFamily: 'NotoSansKR-Thin',
        fontSize : 12
    }
})

export default input;