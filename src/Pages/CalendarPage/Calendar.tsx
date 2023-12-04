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
import { MarkedDates, Theme } from "react-native-calendars/src/types";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { FlatList } from "react-native-gesture-handler";
import AddTask from "./AddTask";
import DayComponent from "./DayComponent";
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

export default function CustomCalendar({ markedDates, setOpenModal }: Props) {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string>(currentDate);

    useEffect(() => {
        setSelected(currentDate);
    }, [currentDate]);

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
    const calendarTheme: Theme = {
        backgroundColor: "#ffffff",
        calendarBackground: "#ffffff",
        textSectionTitleColor: "#b6c1cd",
        selectedDayBackgroundColor: "#00adf5",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#00adf5",
        dayTextColor: "#2d4150",
        textDisabledColor: "#d9e",
        weekVerticalMargin: 0,
        // stylesheet: {
        //     calendar: {
        //         main: {
        //             overflow: "visible",
        //         },
        //     },
        //     "calendar-list": {
        //         main: {
        //             overflow: "visible",
        //         },
        //     },
        // },
    };
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }, []);

    const getMarkedDatesForWeek = (selectedDate) => {
        const selectedWeek = moment(selectedDate).week();
        const selectedMonth = moment(selectedDate).format("MM")
        const selectedYear = moment(selectedDate).format("YYYY")
        console.log(selectedWeek,selectedMonth,selectedYear);
        
        const markedDatesForWeek = {};
        
        Object.entries(markedDates).forEach(([date, marked]) => {
            const week = moment(date).week();
            const month = moment(date).format("MM")
            const year = moment(date).format("YYYY")
          if (week === selectedWeek && month==selectedMonth && year ==selectedYear) {
            markedDatesForWeek[date] = marked;
          }
        });
    
        return markedDatesForWeek;
      };

      const getMaxCountMarkedDatesPerDayOfWeek = () => {
        const counts = {};
        const maxCounts = {};
    
        Object.entries(markedDates).forEach(([date]) => {
          const week = moment(date).week()
          const dayOfWeek = new Date(date).getDay();
    
          if (!counts[week]) {
            counts[week] = {};
          }
    
          if (!counts[week][dayOfWeek]) {
            counts[week][dayOfWeek] = 0;
          }
    
          counts[week][dayOfWeek]++;
          maxCounts[week] = Math.max(
            maxCounts[week] || 0,
            counts[week][dayOfWeek]
          );
        });
    
        return maxCounts;
      };
      console.log("Кол-во на неделю: ", getMaxCountMarkedDatesPerDayOfWeek());
      

      const getMaxCountMarkedDatesOnWeek = () => {
        const counts = {};
        let maxCount = 0;
    
        Object.entries(markedDates).forEach(([date]) => {
          const week = moment(date).week();
          if (!counts[week]) {
            counts[week] = 0;
          }
          counts[week]++;
          maxCount = Math.max(maxCount, counts[week]);
        });
    
        return maxCount;
      };

     

    const renderDay = (day) => {
        let height = 50; // Default height for days
        const weekNumber = Math.ceil(parseInt(day.day) / 7);

        // Calculate the height based on the week number
        if (weekNumber === 1) {
            height = 50;
        } else if (weekNumber === 2) {
            height = 70;
        } else if (weekNumber === 3) {
            height = 90;
        } // Add more conditions for additional weeks

        return (
            <View style={{ height }}>
                <Text>{day.day}</Text>
            </View>
        );
    };
    const customHeaderTitle = () => {
        return (
            <View>
                <Pressable
                    onPress={() => {
                        setOpenModal(true);
                    }}>
                    <Text>
                        {new Date(currentDate).toLocaleString("default", {
                            year: "numeric",
                            month: "long",
                        })}
                    </Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View>
            <ScrollView
                style={{
                    marginBottom: 10,
                     height: 580
                }}
                horizontal={false}
                stickyHeaderIndices={[1]}
                invertStickyHeaders={true}>
                    <Calendar
                        key={currentDate}
                        date={currentDate}
                        current={currentDate}
                        style={{
                            borderWidth: 1,
                            borderColor: "gray",
                            // maxHeight: 500,
                        }}
                        
                        firstDay={1}
                        theme={calendarTheme}
                        customHeaderTitle={customHeaderTitle()}
                        dayComponent={({ date, state, marking }) => {
                            return (
                                <DayComponent
                                    selected={selected}
                                    date={date}
                                    marking={marking}
                                />
                            );
                        }}
                        markingType="multi-dot"
                        markedDates={{
                            ...markedDates,
                            [selected]: {
                                selected: true,
                                selectedColor: "orange",
                                dots: markedDates[selected]?.dots,
                            },
                        }}
                        onMonthChange={(date) =>
                            dispatch(setCurrentDate(date.dateString))
                        }

                    />
            </ScrollView>
            <AddTask />
        </View>
    );
}
