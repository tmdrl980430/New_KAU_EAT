import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RigthArrow from '../../../../assets/images/right_arrow.png';
import Ticket from '../../../../utils/ticket/userticket';

const TicketList = () => {

    return (
        <View >
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default TicketList;