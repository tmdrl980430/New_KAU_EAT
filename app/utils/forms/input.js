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
        ...Platform.select({
            ios: {
                height: hp('6.2%')
            },
            android: {
                height: hp('8.5%')
            }
        }),
        borderRadius: hp('2%'),
        borderWidth: wp('0.2%'),
        paddingStart: hp('1.6%'),
        paddingTop: hp('1.6%'),
        paddingBottom:  hp('1.6%'),
        marginTop: hp('1%'),
        fontFamily: 'NotoSansKR-Regular',
        fontSize:  hp('1.7%'),
    },
    textFormRevised: {
        ...Platform.select({
            ios: {
                height: hp('6.2%')
            },
            android: {
                height: hp('8.5%')
            }
        }),
        borderColor: '#FF3D3D',
        borderRadius: hp('2%'),
        borderWidth: wp('0.2%'),
        paddingStart: hp('1.6%'),
        paddingTop: hp('1.6%'),
        paddingBottom:  hp('1.6%'),
        marginTop: hp('1%'),
        fontFamily: 'NotoSansKR-Regular',
        fontSize:  hp('1.7%'),
    },
    textSignUpInput: {
        ...Platform.select({
            ios: {
                height: hp('6.2%')
            },
            android: {
                height: hp('8.5%')
            }
        }),
        borderColor: '#ECF1F6',
        borderRadius: hp('2%'),
        borderWidth: wp('0.2%'),
        paddingStart: hp('1.6%'),
        paddingTop: hp('1.6%'),
        paddingBottom:  hp('1.6%'),
        marginTop: hp('1%'),
        fontFamily: 'NotoSansKR-Regular',
        fontSize:  hp('1.7%'),
    }
})

export default input;