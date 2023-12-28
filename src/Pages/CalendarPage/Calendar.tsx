import {
    View,
    Text,
    Pressable,
    ScrollView,
    LogBox,
    Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MarkedDates, Theme } from "react-native-calendars/src/types";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { setCurrentDate } from "@store/tasksDatesSlice";
import moment from "moment";
interface Props {
    markedDates: MarkedDates;
    setOpenModal: (open: boolean) => void;
    countTask:number
}
type countOnWeek = {
    [key: number]: number;
};

export default function CustomCalendar({ markedDates, setOpenModal,countTask }: Props) {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string>(currentDate);
    let monthYear = moment(currentDate).format("MM-yyyy")
    useEffect(()=>{
        setSelected(currentDate)
    },[currentDate])
    // Функция оптимизация высоты для недели
    const getStartAndEndOfWeeks = (month: string|Date) => {
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

        // setCountOnWeek(filteredMarkedDates || {});
        console.log(filteredMarkedDates);
        console.log("Снова вызвали функцию");
        
        return filteredMarkedDates || {};
    };
    const countOnWeek = useMemo(
        () => getStartAndEndOfWeeks(currentDate),
        [countTask,monthYear]
    );

    const getHeightOnCount = (date: string) => {
        if (!countOnWeek) return 100;
        const week = moment(date).isoWeek();
        let sum = 75 + 40 * (countOnWeek[week] || 0);
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
    function getFirstCapitalize(word: string) {
        return word[0].toUpperCase() + word.slice(1);
    }

    return (
        <View style={{ marginBottom: 10, height: windowHeight - 130 }}>
            <ScrollView
                horizontal={false}
                stickyHeaderIndices={[1]}
                invertStickyHeaders={true}>
                <Calendar
                    key={currentDate}
                    style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        borderTopWidth: 0,
                    }}
                    current={currentDate}
                    firstDay={1}
                    date={currentDate}
                    theme={calendarTheme}
                    customHeaderTitle={
                        <Pressable
                            style={{
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "center",
                                paddingVertical: 5,
                                marginBottom: 5,
                            }}
                            onPress={() => setOpenModal(true)}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    backgroundColor: "#dafffd",
                                    borderWidth: 1,
                                    // borderTopWidth:1,
                                    // borderBottomWidth:0.8,
                                    borderColor: "#a0f7ff",
                                    paddingHorizontal: 35,
                                    paddingVertical: 5,
                                }}>
                                {getFirstCapitalize(
                                    moment(currentDate).format("MMMM yyyy")
                                )}
                            </Text>
                        </Pressable>
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
                                    // setSelected(date.dateString);
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
