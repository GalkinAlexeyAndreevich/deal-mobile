import {
    View,
    Text,
    Pressable,
    ScrollView,
    LogBox,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, Agenda, LocaleConfig } from "react-native-calendars";
import { DateData, MarkedDates, Theme } from "react-native-calendars/src/types";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { setCurrentDate } from "@store/tasksDatesSlice";
import moment from "moment";
interface Props {
    markedDates: MarkedDates;
    setOpenModal: (open: boolean) => void;
}
type countOnWeek = {
    [key: number]: number;
};

export default function CustomCalendar({ markedDates, setOpenModal }: Props) {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);

    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string>(currentDate);
    const [countOnWeek, setCountOnWeek] = useState({} as countOnWeek);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        setSelected(currentDate);
        getStartAndEndOfWeeks(currentDate);
    }, [markedDates]);

    // Функция оптимизация высоты для недели
    const getStartAndEndOfWeeks = (month: string) => {
        console.log("getStartAndEndOfWeeks", month);

        const startOfMonth = moment(month).startOf("month");
        const endOfMonth = moment(month).endOf("month");

        const startWeek = startOfMonth.isoWeek();
        const endWeek = endOfMonth.isoWeek();
        console.log(startOfMonth, endOfMonth, startWeek, endWeek);

        let filtered = {} as countOnWeek;
        for (let i = startWeek; i <= endWeek; i++) {
            filtered[i] = 0;
        }

        const filteredMarkedDates = Object.keys(markedDates).reduce(
            (filtered, date) => {
                const currentNumberWeek = moment(date).isoWeek();
                if (moment(date).year() !== moment(month).year())
                    return filtered;
                if (
                    currentNumberWeek >= startWeek &&
                    currentNumberWeek <= endWeek
                ) {
                    filtered[currentNumberWeek] = Math.max(
                        filtered[currentNumberWeek],
                        markedDates[date]?.dots?.length
                    );
                }
                return filtered;
            },
            filtered
        );

        setCountOnWeek(filteredMarkedDates || {});
        setLoading(true);
        console.log(filteredMarkedDates);
    };
    const getHeightOnCount = (date: string) => {
        if (!loading) return 100;
        const week = moment(date).isoWeek();
        console.log(countOnWeek[week], week, countOnWeek);
        let sum = 75 + 25 * (countOnWeek[week] || 0);
        return sum;
    };

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
    const windowHeight = Dimensions.get("window").height;
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }, []);
    if (!loading) return;
    return (
        <View style={{ marginBottom: 10,height:windowHeight-130}}> 
        <ScrollView
            
            horizontal={false}
            stickyHeaderIndices={[1]}
            invertStickyHeaders={true}>

                <Calendar
                    key={currentDate}
                    style={{
                        borderWidth: 1,
                        borderColor: "gray",
                    }}
                    current={currentDate}
                    firstDay={1}
                    theme={calendarTheme}
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
                    dayComponent={({ date, state, marking }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    console.log(
                                        "selected day",
                                        date.dateString
                                    );
                                    dispatch(setCurrentDate(date.dateString));
                                    setSelected(date.dateString);
                                }}
                                style={{
                                    width: 55,
                                    height: getHeightOnCount(date.dateString),
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
                                        <View key={index}>
                                            <Text
                                                style={{
                                                    backgroundColor:
                                                        item?.color,
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
                        dispatch(setCurrentDate(date.dateString));
                    }}
                    date={currentDate}
                />
         
        </ScrollView>
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
