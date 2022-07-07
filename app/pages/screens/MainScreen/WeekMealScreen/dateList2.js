import React, { useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

const Calendar = ({setSelectedDay, selectedDay, setFullDay}) => {
    // 날짜 리스트 표시 관련
    const [now, setNow] = useState(new Date());

    const todayWeek = now.getDay();
    const today = now.getDate();
    //   console.log('today', today);
    const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const [nowMonth, setNowMonth] = useState(now.getMonth() + 1);

    // 다음날 부터 표시되도록 수정필요. 월말 계산을 위해서 오늘이 월의 마지막날인지 체크. 마지막 날이면 ~~
    //
    const getAlldate = (today, lastday) => {
        let dates = [];
        // 오늘날짜 + 1 연산.
        today = today + 1;
        if (today > lastday) {
            today = 1;
            setNowMonth(nowMonth + 1);
        }
        dates[0] = today;
        for (let i = 1; i <= 6; i++) {
            today++;
            //마지막 날보다 날짜가 클경우 today를 1로 초기화.
            if (today > lastday) {
                today = 1;
                dates[i] = //일반 경우 그냥 날짜 추가
                today;
            } else {
                dates[i] = today;
            }
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
        weeklist[0] = strWeek[todayWeek];

        for (let i = 1; i <= 6; i++) {
            todayWeek++;
            if (todayWeek > 6) {
                todayWeek = 0;
                weeklist[i] = strWeek[todayWeek];
            } else {
                weeklist[i] = strWeek[todayWeek];
            }
        }

        return weeklist;
    };

    useEffect(() => {
        const CalendarDay = getAlldate(today, lastday);
        const CalendarWeek = getAllweek(todayWeek);
        setCalendarObject([
            {
                week: CalendarWeek[0],
                day: CalendarDay[0]
            }, {
                week: CalendarWeek[1],
                day: CalendarDay[1]
            }, {
                week: CalendarWeek[2],
                day: CalendarDay[2]
            }, {
                week: CalendarWeek[3],
                day: CalendarDay[3]
            }, {
                week: CalendarWeek[4],
                day: CalendarDay[4]
            }, {
                week: CalendarWeek[5],
                day: CalendarDay[5]
            }, {
                week: CalendarWeek[6],
                day: CalendarDay[6]
            }
        ]);
    }, []);

    const [calendarObject, setCalendarObject] = useState([]);
    // const CalendarObject = [     { week: CalendarWeek[0], day: CalendarDay[0] },
    // { week: CalendarWeek[1], day: CalendarDay[1] },     { week: CalendarWeek[2],
    // day: CalendarDay[2] },     { week: CalendarWeek[3], day: CalendarDay[3] }, {
    // week: CalendarWeek[4], day: CalendarDay[4] },     { week: CalendarWeek[5],
    // day: CalendarDay[5] },     { week: CalendarWeek[6], day: CalendarDay[6] }, ];

    const handleDay = (day) => {
        const FullDay = now.getFullYear() + '-' + String(nowMonth).padStart(2, '0') +
                '-' + String(day).padStart(2, '0');
        // console.log('FullDay');
        setFullDay(FullDay);
        setSelectedDay(day);
    };
    return (
        <View>
            <Text style={styles.container}>{nowMonth}월</Text>
            <View style={styles.calendarWrap}>
                <View>
                    <View>
                        <View>
                            {
                                calendarObject && calendarObject.map((calendar, index) => (
                                    <View style={styles.weekBoxContainer} key={index}>{calendar.week}</View>
                                ))
                            }
                        </View>
                        <View style={styles.barcontainer}/>
                        <View>
                        {
                                calendarObject && calendarObject.map((calendar, index) => (
                                    <View style={styles.dayBoxContainer}
                                        key={index}
                                        onClick={() => handleDay(calendar.day)}
                                        pick={calendar.day == selectedDay}>
                                        {calendar.day}
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        fontSize: 2.8,
        fontWeight: "bold",
        marginBottom: 1,
    },
    weekBoxContainer : {
        height: 6.5,
        width: 10.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    calendarWrap : {
        width: 73.38,
        backgroundcolor: "#d5d5d5",
        height: 0.1
    },
    barcontainer: {
        width: 73.38,
        backgroundcolor: "#d5d5d5",
        height: 0.1
    },
    // dayBoxContainer : {
    //     cursor: "pointer",
    //     height: 10.2,
    //     width: 10.5,
    //     fontSize: 2.9,
    //     fontWeight: "bold",
    //     display : "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundcolor: { (props) => {if (props.pick) {backgroundcolor : '#3b5cf6'}}},
    //     color : { (props) => {if (props.pick) {return '#fff';}}}
    // }
})


export default Calendar;
