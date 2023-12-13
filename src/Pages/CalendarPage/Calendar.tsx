import {
    View,
    Text,
    Pressable,
    ScrollView,
    // FlatList,
    TouchableOpacity,
    LogBox,
} from "react-native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Calendar, Agenda, LocaleConfig } from "react-native-calendars";
import { DateData, MarkedDates, Theme } from "react-native-calendars/src/types";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";
// import { ScrollView } from 'react-native-virtualized-view'
const timeToString = (time: any): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

interface Props {
    markedDates: MarkedDates;
    setOpenModal: (open: boolean) => void;
}
type countOnWeek = {
    [key:number]:number
}

export default function CustomCalendar({ markedDates, setOpenModal }: Props) {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string>(currentDate);
    const [countOnWeek,setCountOnWeek] = useState({} as countOnWeek)
    const [loading, setLoading] = useState(false)
    // console.log(markedDates);

    useEffect(() => {
        setSelected(currentDate);
        getStartAndEndOfWeeks(currentDate);
    }, [currentDate]);


    const getStartAndEndOfWeeks = (month:string) => {
        console.log("getStartAndEndOfWeeks",month);
        setLoading(false)
        const startOfMonth = moment(month).startOf('month');
        const endOfMonth = moment(month).endOf('month');

        const startWeek = startOfMonth.isoWeek()
        const endWeek = endOfMonth.isoWeek()

        let filtered = {} as countOnWeek
        for (let i=startWeek; i<=endWeek; i++){
            filtered[i] = 0
        }

        const filteredMarkedDates = Object.keys(markedDates).reduce((filtered, date) => {
            const currentNumberWeek = moment(date).isoWeek()
            if(moment(date).year() !== moment(month).year()) return
            if (currentNumberWeek >= startWeek && currentNumberWeek <= endWeek) {
                filtered[currentNumberWeek] = Math.max(filtered[currentNumberWeek], markedDates[date]?.dots?.length) 
            }
            return filtered;
          }, filtered);
        
        setCountOnWeek(filteredMarkedDates);
        setLoading(true)
        console.log(filteredMarkedDates);      
      };
      const getHeightOnCount = (date:string)=>{
        const week = moment(date).isoWeek()
        console.log(countOnWeek[week], week, countOnWeek);
        
        // let sum = 30 + 25 * countOnWeek[week]
        // console.log(sum);
        
        // return sum
        if(countOnWeek[week]<=1)return 50
        if(countOnWeek[week]<=2)return 100
        if(countOnWeek[week]<=4)return 150
        if(countOnWeek[week]<=6)return 200
        return 15
      }
      
    LocaleConfig.locales["ru"] = {
        monthNames: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        monthNamesShort: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
        ],
        dayNames: [
            "воскресенье",
            "понедельник",
            "вторник",
            "среда",
            "четверг",
            "пятница",
            "суббота",
        ],
        dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        today: "Сегодня",
    };
    LocaleConfig.defaultLocale = "ru";

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }, []);
    if(!loading)return
    return (
        <View>
            <ScrollView
                style={{ marginBottom: 10, height: 580 }}
                horizontal={false}
                stickyHeaderIndices={[1]}
                invertStickyHeaders={true}>
                <View>
                    <Text>{currentDate}</Text>
                    <Calendar
                    
                        key={currentDate}
                        style={{
                            borderWidth: 1,
                            borderColor: "gray",
                            // maxHeight: 500,
                        }}
                        current={currentDate}
                        firstDay={1}
                        // enableSwipeMonths={true}
                        theme={calendarTheme}
                        // hideExtraDays={true}
                        // monthFormat="MMM/yyyy"
                        customHeaderTitle={
                            <View>
                                <Pressable
                                    onPress={() => {
                                        setOpenModal(true);
                                    }}>
                                    <Text>
                                        {new Date(currentDate).toLocaleString(
                                            "default",
                                            {
                                                year: "numeric",
                                                month: "long",
                                            }
                                        )}
                                    </Text>
                                </Pressable>
                            </View>
                        }
                        markingType="multi-dot"
                        onDayPress={(day) => {
                            console.log(day);
                            dispatch(setCurrentDate(day.dateString));
                            // setCurrentDate(new Date(day.dateString))
                            setSelected(day.dateString);
                        }}
                        dayComponent={({ date, state, marking }) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        console.log(
                                            "selected day",
                                            date.dateString
                                        );
                                        setSelected(date.dateString);
                                    }}
                                    style={{
                                        width: 55,
                                        height:getHeightOnCount(date.dateString),
                                        borderWidth: 0.2,
                                        borderColor: "#a0a0a0",
                                        margin: 0,
                                        paddingVertical: 5,
                                        // backgroundColor:"orange"
                                        backgroundColor:
                                            selected == date.dateString
                                                ? "#e4f7fe"
                                                : "white",
                                    }}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "black",
                                            fontSize: 15,
                                            paddingLeft: 3,
                                        }}>
                                        {date.day}{" "}
                                    </Text>
                                    {marking?.dots?.map((item, index) => {
                                        return (
                                            <View key={item.key}>
                                                <Text
                                                    style={{
                                                        backgroundColor:item?.color,
                                                        color: item?.selectedDotColor,
                                                        paddingVertical: 3,
                                                        marginVertical: 3,
                                                        fontSize: 10,
                                                        borderRadius: 50,
                                                        textAlign: "center",
                                                    }}>
                                                    {item.key}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </Pressable>
                            );
                        }}
                        markedDates={{
                            ...markedDates,
                            [selected]: {
                                selected: true,
                                selectedColor: "orange",
                                dots: markedDates[selected]?.dots,
                            },
                        }}
                        onMonthChange={(date) => {
                            // handleMonthChange(date.timestamp);
                            dispatch(setCurrentDate(date.dateString));
                        }}
                        date={currentDate}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity
                style={{
                    alignSelf: "stretch",
                    justifyContent: "flex-end",
                    backgroundColor: "#3390ee",
                    paddingVertical: 5,
                }}>
                <Text
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 20,
                    }}>
                    Добавить цель
                </Text>
            </TouchableOpacity>
        </View>
    );
}
export const calendarTheme: Theme = {
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#00adf5",
    dayTextColor: "#2d4150",
    textDisabledColor: "#d9e",
    weekVerticalMargin: 0,
};

