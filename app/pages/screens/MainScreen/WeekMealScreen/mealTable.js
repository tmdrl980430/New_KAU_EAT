import React, {useState} from 'react';
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

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { jwtRecoilState } from '../../../../recoil';

import MealTableComponent from '../../../../utils/meals/meal';



const MealTable = ({date}) => {

    const [loading, setLoading] = useState(false)

    const [jwt, setJwt] = useRecoilState(jwtRecoilState)
    const [error, setError] = useState(null);




    const getMealTable = async () => {
        console.log('getMealTable');
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
                    setResponseData(response.data.result);
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
                <MealTableComponent type={"lunchText"}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%')
    },
    dateText : {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: hp("2.1%"),
        color: '#2B2D41',
    }
});

export default MealTable;