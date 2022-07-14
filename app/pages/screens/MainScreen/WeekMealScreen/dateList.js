import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRecoilState} from 'recoil';
import {dateRecoilState} from '../../../../recoil';

const Calendar = () => {

    //선택 처리 State
    const [isSelect, setSelect] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]);

    const [temp, setTempIndex] = useState(0);

    const [date, setDate] = useRecoilState(dateRecoilState);
    let firstdayIndex;

    // 날짜 리스트 표시 관련
    const [now, setNow] = useState(new Date());

    const todayWeek = now.getDay(); //(월,화,수,목,금,토,일) 반환
    const today = now.getDate(); // 날짜 반환 1~31
    const todayDay = now.getDate();
    //   console.log('today', today);

    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

    const lastday = new Date(koreaNow.getFullYear(), koreaNow.getMonth() + 1, 0).getDate();

    console.log("datedatedate",date);

    const [nowMonth, setNowMonth] = useState(koreaNow.getMonth() + 1);

    console.log("nowMonth", nowMonth);

    const [calendarObject, setCalendarObject] = useState([]);

    const getAlldate = (today, lastday, todayWeek) => {

        let month = nowMonth
        let year = koreaNow.getFullYear();
        const ROW = 3;
        const COLUMN = 6;

        const dates = new Array(ROW); // [empty x 2]

        // 이차원 배열의 열을 2로 지정
        for (var i = 0; i < COLUMN; i++) {
            dates[i] = new Array(2);
        }
        const lastMonthDays = new Date(koreaNow.getFullYear(), koreaNow.getMonth(), 0).getDate();
        let lastdayCheck = 0;

        // 오늘날짜 + 1 연산. 월 변환시키기
        if (today > lastday) {
            today = 1;
            if (month === 12) {
                year = year + 1;
            }
            month = month + 1;
            if (month === 13) {
                month = 1;
            }
        }

        for (let i = 0; i <= 6; i++) {

            if (lastdayCheck === 1) {
                lastday = lastMonthDays;
            }

            if (today > lastday) {
                today = 1;
                if (month === 12) {
                    year = year + 1;
                }
                month = month + 1;
            }

            if (todayWeek === 7) {
                todayWeek = 0;
            }

            if (todayWeek === 0) {
                dates[0][6] = today;
                dates[1][6] = month;
                dates[2][6] = year;
                const temp = today;
                today = today - 7;
                if (today < 1) {
                    //직전 달의 일 수
                    today = lastMonthDays - 7 + temp;
                    if (month === 1) {
                        year = year - 1;
                    }
                    month = month - 1;
                    if (month === 0) {
                        month = 12;
                    }
                    lastdayCheck = 1;
                }
            } else {
                dates[0][todayWeek - 1] = today;
                dates[1][todayWeek - 1] = month;
                dates[2][todayWeek - 1] = year;
            }

            if (i === 0) {
                setSelect([
                    ...isSelect.slice(0, todayWeek - 1),
                    isSelect[todayWeek - 1] = true,
                    ...isSelect.slice(todayWeek - 1 + 1)
                ]);

                setTempIndex(todayWeek - 1);

                firstdayIndex = todayWeek -1;
                
            }
            today++;
            todayWeek++;
        }

        return dates;
    };

    const getAllweek = (todayWeek) => {
        let strWeek = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
        let weeklist = [];

        //첫번째 오늘 날짜 적용

        for (let i = 0; i <= 6; i++) {
            if (todayWeek === 0) {
                weeklist[6] = strWeek[todayWeek];
            } else {
                weeklist[todayWeek - 1] = strWeek[todayWeek];
            }
            todayWeek++;

            if (todayWeek === 7) {
                todayWeek = 0;
            }
        }

        console.log(weeklist);

        return weeklist;
    };

    useEffect(() => {


        setSelect([
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ])
        
        const CalendarDay = getAlldate(todayDay, lastday, todayWeek);
        const CalendarWeek = getAllweek(todayWeek);
        setCalendarObject([
            {
                year: CalendarDay[2][0],
                month: CalendarDay[1][0],
                week: CalendarWeek[0],
                day: CalendarDay[0][0]
            }, {
                year: CalendarDay[2][1],
                month: CalendarDay[1][1],
                week: CalendarWeek[1],
                day: CalendarDay[0][1]
            }, {
                year: CalendarDay[2][2],
                month: CalendarDay[1][2],
                week: CalendarWeek[2],
                day: CalendarDay[0][2]
            }, {
                year: CalendarDay[2][3],
                month: CalendarDay[1][3],
                week: CalendarWeek[3],
                day: CalendarDay[0][3]
            }, {
                year: CalendarDay[2][4],
                month: CalendarDay[1][4],
                week: CalendarWeek[4],
                day: CalendarDay[0][4]
            }, {
                year: CalendarDay[2][5],
                month: CalendarDay[1][5],
                week: CalendarWeek[5],
                day: CalendarDay[0][5]
            }, {
                year: CalendarDay[2][6],
                month: CalendarDay[1][6],
                week: CalendarWeek[6],
                day: CalendarDay[0][6]
            }
        ]);
        console.log(calendarObject);
        console.log('isSelect3', isSelect);

    }, []);

    const handleDay = (day, month, year, index) => {
        const FullDay = String(year) + '-' + String(month).padStart(2, '0') + '-' +
                String(day).padStart(2, '0');
        // -> 이 FullDay를 넘겨줘야 함
        console.log(index);
        console.log('FullDay', FullDay);

        setDate(FullDay);
        //해당 인덱스 제외하고 false로 바꾸기

        setSelect([
            ...isSelect.slice(0, temp),
            isSelect[temp] = false,
            ...isSelect.slice(temp + 1)
        ]);

        console.log('isSelect1', isSelect);

        if (isSelect[index] === false) {
            setSelect([
                ...isSelect.slice(0, index),
                isSelect[index] = true,
                ...isSelect.slice(index + 1)
            ]);
        }
        setTempIndex(index);

        console.log('isSelect2', isSelect);
    };

    return (
        <View>
            <View style={styles.container}>
                {
                    calendarObject && calendarObject.map((calendar, index) => (
                        <TouchableOpacity
                            style={[
                                styles.selectViewContainer, {
                                    backgroundColor: isSelect[index]
                                        ? '#3D3580'
                                        : '#F4F4F4'
                                }
                            ]}
                            key={index}
                            onPress={() => handleDay(calendar.day, calendar.month, calendar.year, index)}>
                            <Text
                                style={[
                                    styles.selectDayBoxContainerText, {
                                        color: isSelect[index]
                                            ? 'white'
                                            : '#9CA4AB'
                                    }
                                ]}>
                                {calendar.day}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp('80%'),
        height: hp('5%'),
        marginTop: hp('3%'),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "#F4F4F4",
        borderRadius: 10,
        paddingStart: wp('1.3%'),
        paddingEnd: wp('1.3%'),
        paddingBottom: hp('1.5%'),
        paddingTop: hp('1.5%')
    },
    selectViewContainer: {
        width: wp('6%'),
        height: hp('4%'),
        borderRadius: 5,
        marginTop: hp('0.3%'),
        marginBottom: hp('0.3%'),
        alignItems: 'center',
        justifyContent: 'center',
        //        backgroundColor: "#3D3580",
    },
    unselectViewContainer: {
        width: wp('6%'),
        height: hp('4%'),
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
        borderColor: "#3D3580",
        marginTop: hp('0.3%'),
        marginBottom: hp('0.3%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectDayBoxContainerText: {
        fontFamily: 'NotoSansKR-Bold',
        color: 'white',
        fontSize: wp("3.5%"),
        lineHeight: 22
    }

    // dayBoxContainer : {     cursor: "pointer",     height: 10.2,     width: 10.5,
    // fontSize: 2.9,     fontWeight: "bold",     display : "flex", justifyContent:
    // "center",     alignItems: "center",     backgroundcolor: { (props) => {if
    // (props.pick) {backgroundcolor : '#3b5cf6'}}},     color : { (props) => {if
    // (props.pick) {return '#fff';}}} }
})

export default Calendar;
