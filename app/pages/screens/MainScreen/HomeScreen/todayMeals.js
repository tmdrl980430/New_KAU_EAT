import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import {useRecoilState} from 'recoil';
import {dateRecoilState, jwtRecoilState, severURLRecoilState} from '../../../../recoil';
import axios from 'axios';


const MealList = (props) => {

    const [IP, setIP] = useRecoilState(severURLRecoilState);

    const [jwt, setJwt] = useRecoilState(jwtRecoilState)
    const [date, setDate] = useRecoilState(dateRecoilState)

    const [now, setNow] = useState(new Date());

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [responseData, setResponseData] = useState({});

    const [menuStatus, setMenuStatus] = useState(false);


    useEffect(() => {
        if(props.refreshing == true) {
            getMealTable()
        }
    },[props.refreshing])
    
    useEffect(() => {
        getMealTable();
    }, [jwt])

    useEffect(() => {
        console.log('responseData', responseData);
    }, [responseData])

    const todayDate = `${now.getFullYear()}-${String(now.getMonth()).padStart(
        2,
        '0'
    )}-${String(now.getDate()).padStart(2, '0')}`

    const getMealTable = async () => {
        setLoading(true);

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // axios     .defaults     .headers     .common['x-access-token'] = jwt

            const response = await axios
                .get(`${IP}/menus?date=${date}`, {
                    headers: {
                        "x-access-token": jwt
                    }
                })
                .then((response) => {
                    setResponseData(response.data.result.menus);
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
                        }}>{item.mealTypeName}
                    </Text>
                    {
                        item.menu == null
                            ? (
                                <View style={styles.menuStatusContainer}>
                                    <Text
                                        style={{
                                            fontFamily: 'NotoSansKR-Regular',
                                            fontSize: hp('1.7%'),
                                            color: '#FFFFFF'
                                        }}>휴무</Text>
                                </View>
                            )
                            : (
                                <View style={styles.menuStatusContainer}>{
                                        item.menu.menuStatus == "ACTIVE"
                                            ? (<View/>)
                                            : (
                                                <Text
                                                    style={{
                                                        fontFamily: 'NotoSansKR-Regular',
                                                        fontSize: hp('1.7%'),
                                                        color: '#FFFFFF'
                                                    }}>품절</Text>
                                            )
                                    }
                                </View>
                            )
                    }
                </View>
                {
                    item.menu == null
                        ? (
                            <Text
                                style={{
                                    fontFamily: 'NotoSansKR-Bold',
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    width: wp('60%'),
                                    marginTop: hp('1%'),
                                    marginBottom: hp('0.3%')
                                }}></Text>
                        )
                        : (
                            <Text
                                style={{
                                    fontFamily: 'NotoSansKR-Bold',
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    width: wp('60%'),
                                    marginTop: hp('1%'),
                                    marginBottom: hp('0.3%')
                                }}>{item.menu.menu}</Text>
                        )
                }
                {
                    item.menu == null
                        ? (
                            <Text
                                style={{
                                    fontFamily: 'NotoSansKR-Bold',
                                    fontSize: hp('2.1%'),
                                    color: '#FFFFFF',
                                    marginBottom: hp('0.5%')
                                }}></Text>
                        )
                        : (
                            <Text
                                style={{
                                    fontFamily: 'NotoSansKR-Bold',
                                    fontSize: hp('2.1%'),
                                    color: '#FFFFFF',
                                    marginBottom: hp('0.5%')
                                }}>{item.price}원</Text>
                        )
                }
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
                                data={responseData}
                                sliderWidth={wp('85%')}
                                itemWidth={wp('85%')}
                                firstItem={0}
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