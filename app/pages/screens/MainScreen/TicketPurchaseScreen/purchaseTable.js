import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    Button,
    useWindowDimensions
} from 'react-native';
import axios from 'axios';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from 'recoil';
import {dateRecoilState, jwtRecoilState, purchaseTicketRecoilState} from '../../../../recoil';

import PurchaseTableComponent from '../../../../utils/purchase/purchase';
import PurchaseComponent from './purchaseComponent'
import PurchaseComponent1 from './purchaseComponent1'
import PurchaseComponent2 from './purchaseComponent2'
import PurchaseComponent3 from './purchaseComponent3'

const PurchaseTable = () => {

    const [loading, setLoading] = useState(false)

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [error, setError] = useState(null);

    const [date, setDate] = useRecoilState(dateRecoilState);

    const [tableObject, setTableObject] = useState([]);

    const [tableObject0, setTableObject0] = useState([]);
    const [tableObject1, setTableObject1] = useState([]);
    const [tableObject2, setTableObject2] = useState([]);
    const [tableObject3, setTableObject3] = useState([]);

    const [isCount, setCount] = useState([0, 0, 0, 0]);

    const [purchaseTicket, setPurchaseTicket] = useRecoilState(
        purchaseTicketRecoilState
    );

    useEffect(() => {
        const now = new Date();

        const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
        const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
        const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

        const today = String(koreaNow.getFullYear()) + '-' + String(
            koreaNow.getMonth() + 1
        ).padStart(2, '0') + '-' + String(koreaNow.getDate()).padStart(2, '0')

        setDate(today);
    }, [])

    useEffect(() => {
        if (date != "") {
            getPruchaseTable();
        }
        console.log("tableObject", tableObject);
    }, [date])


    useEffect(() => {
        console.log("tableObject0", tableObject0);
        console.log("tableObject0.menu", tableObject0.menu);
        
    }, [tableObject0])

    const getPruchaseTable = async () => {
        console.log('getPruchaseTable');
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            console.log(jwt);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .get(`http://3.38.35.114/meals?date=${date}`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    console.log(`response 확인 : ${response.data.code}`);
                    setTableObject(response.data.result);
                    setTableObject0(response.data.result[0]);
                    setTableObject1(response.data.result[1]);
                    setTableObject2(response.data.result[2]);
                    setTableObject3(response.data.result[3]);

                    console.log("조회", response.data.result[1]);
                })
                .catch((error) => {
                    console.log(error);
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
            console.log(e);
            setError(e);
        }
        // loading 끄기
        setLoading(false);

    };

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>

                {
                    tableObject0 != null
                        ? (
                            <PurchaseComponent
                                type={tableObject0.mealTypeName}
                                price={tableObject0.price}
                                mealType={tableObject0.mealTypeName}
                                menu={tableObject0.menu}
                                key={0}
                                index={0}/>
                        )
                        : (<View/>)
                }
                {
                    tableObject != null
                        ? (
                            <PurchaseComponent1
                            type={tableObject1.mealTypeName}
                            price={tableObject1.price}
                            mealType={tableObject1.mealTypeName}
                            menu={tableObject1.menu}
                            key={1}
                            index={1}/>
                        )
                        : (<View/>)
                }
                {
                    tableObject != null
                        ? (
                            
                            <PurchaseComponent2
                                type={tableObject2.mealTypeName}
                                price={tableObject2.price}
                                mealType={tableObject2.mealTypeName}
                                menu={tableObject2.menu}
                                key={2}
                                index={2}/>
                        )
                        : (<View/>)
                }
                {
                    tableObject != null
                        ? (
                            <PurchaseComponent3
                            type={tableObject3.mealTypeName}
                            price={tableObject3.price}
                            mealType={tableObject3.mealTypeName}
                            menu={tableObject3.menu}
                            key={3}
                            index={3}/>
                        )
                        : (<View/>)
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%'),
        ...Platform.select({
            ios: {},
            android: {
                marginStart: wp('0.5%'),
                marginEnd: wp('0.5%')
            }
        })
    },
    dateText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp("2.1%"),
        color: '#2B2D41'
    }
});

export default PurchaseTable;