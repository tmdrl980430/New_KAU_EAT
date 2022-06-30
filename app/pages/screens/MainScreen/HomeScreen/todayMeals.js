import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import {useRecoilState} from 'recoil';
import {jwtRecoilState} from '../../../../recoil';
import axios from 'axios';

import LogoImage from '../../../../assets/images/kau_logo_today_meal.png';

const MealList = () => {

    const [jwt, setJwt] = useRecoilState(jwtRecoilState)

    const [now, setNow] = useState(new Date());

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const [responseData, setResponseData] = useState({});

    const [menuStatus, setMenuStatus] = useState(false);

    useEffect(() => {
        console.log(todayDate);
        console.log(now);
        console.log(responseData);
    }, [responseData])

    useEffect(() => {
        getMealTable();
    }, [])

    const todayDate = `${now.getFullYear()}-${String(now.getMonth()).padStart(
        2,
        '0'
    )}-${String(now.getDate()).padStart(2, '0')}`

    // test data
    const date = '2022-06-13'

    const getMealTable = async () => {
        console.log('getMealTable');

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            console.log('getMealTable_try');

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // axios     .defaults     .headers     .common['x-access-token'] = jwt

            const response = await axios
                .get(`http://3.38.35.114/meals?date=${date}`, {
                    headers: {
                        "x-access-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo4LCJpYXQiOjE2NTU1NTg4NzYsI' +
                                'mV4cCI6MTY4NzA5NDg3Nn0.A-00mT4Matep0KjJc5imo4xiXV5A2ymVfq8u5uYarc4'
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
            console.log('getMealTable_catch');
            console.log(e);
            setError(e);
        }
        // loading 끄기
        setLoading(false);
    };

    const _renderItem = ({item, index}) => {
        return (
            <View
                style={{
                    position: 'relative',
                    backgroundColor: '#3D3580',
                    borderRadius: 16,
                    height: hp('24%'),
                    width: wp('85%'),
                    marginStart: wp('8%'),
                    marginEnd: wp('10%'),
                    paddingStart: wp('5%'),
                    paddingEnd: wp('5%'),
                    justifyContent: "space-around"
                }}>
                <View style={styles.mealTypeContainer}>
                    <Text
                        style={{
                            fontFamily: 'NotoSansKR-Bold',
                            fontSize: hp('2%'),
                            color: '#FFFFFF'
                        }}>{item.mealType}
                    </Text>
                    {
                        item.menuStatus == 'ACTIVE'
                            ? (<View/>)
                            : (
                                <View style={styles.menuStatusContainer}>
                                    <Text
                                        style={{
                                            fontFamily: 'NotoSansKR-Regular',
                                            fontSize: hp('1.7%'),
                                            color: '#FFFFFF'
                                        }}>{item.menuStatus}</Text>
                                </View>
                            )
                    }
                </View>
                <Text
                    style={{
                        fontFamily: 'NotoSansKR-Bold',
                        fontSize: 16,
                        color: '#FFFFFF',
                        width: wp('60%'),
                        marginTop: hp('1%'),
                        marginBottom: hp('0.3%')
                    }}>{item.menu}</Text>
                <Text
                    style={{
                        fontFamily: 'NotoSansKR-Bold',
                        fontSize: hp('2.1%'),
                        color: '#FFFFFF',
                        marginBottom: hp('0.5%')
                    }}>{item.price}</Text>
                <Image style={styles.kauLogo} source={LogoImage} resizeMode={'contain'}/>

            </View>

        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                marginTop: hp('1.7%')
            }}>
            <View style={{
                    flexDirection: 'row'
                }}>
                {
                    responseData === {}
                        ? (<View/>)
                        : (
                            <Carousel
                                layout={"default"}
                                data={responseData.meals}
                                sliderWidth={300}
                                itemWidth={330}
                                firstItem={1}
                                renderItem={_renderItem}
                                loop={true}/>
                        )
                }

            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    mealTypeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp('1.5%')
    },
    menuStatusContainer: {
        backgroundColor: '#262651',
        borderRadius: hp('2%'),
        paddingStart: hp('1%'),
        paddingEnd: hp('1%'),
        marginStart: hp('1%')
    },
    kauLogo: {
        position: 'absolute',
        top: hp('-1%'),
        bottom: 0,
        left: wp('47%')
    }

});

export default MealList;