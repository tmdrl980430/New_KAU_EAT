import React from 'react';
import {Text, View, StyleSheet, Image, PlatformColor} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Title from '../../../../utils/title/title'

const TicketPurchaseTitle = () => {

    return (
        <Title type={"purchaseTicketText"}/>
    )
}

export default TicketPurchaseTitle;