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
import {dateRecoilState, jwtRecoilState, severURLRecoilState, weekDateRecoilState} from '../../../../recoil';

import MealTableComponent from '../../../../utils/meals/meal';

const MealTable = (props) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);


    const [loading, setLoading] = useState(false)

    const [jwt, setJwt] = useRecoilState(jwtRecoilState);
    const [error, setError] = useState(null);

    const [date, setDate] = useRecoilState(weekDateRecoilState);

    const [tableObject, setTableObject] = useState([]);

    useEffect(() => {
        if(props.refreshing == true) {
            getMealTable()
        }
    },[props.refreshing])


    useEffect(() => {
        if (date != "") {
            getMealTable();
        }
    }, [date])

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

    const getMealTable = async () => {
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            const response = await axios
                .get(`${IP}/menus?date=${date}`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    setTableObject(response.data.result.menus);
                })
                .catch((error) => {
                });
            // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
        } catch (e) {
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
                    tableObject && tableObject.map((menu, index) => (
                        <MealTableComponent
                            type={menu.mealTypeName}
                            price={menu.price}
                            mealType={menu.mealTypeName}
                            menu={menu}
                            key={index}/>
                    ))
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('2%')
    },
    dateText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp("2.1%"),
        color: '#2B2D41'
    }
});

export default MealTable;