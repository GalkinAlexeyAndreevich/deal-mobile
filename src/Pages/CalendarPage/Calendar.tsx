import {
    View,
    Text,
    Pressable,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Calendar, Agenda, LocaleConfig } from "react-native-calendars";
import { MarkedDates, Theme } from "react-native-calendars/src/types";
const timeToString = (time: any): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

interface Props {
    markedDates: MarkedDates;
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    setOpenModal: (open: boolean) => void;
}

export default function CustomCalendar({
    markedDates,
    currentDate,
    setCurrentDate,
    setOpenModal,
}: Props) {
    const [selected, setSelected] = useState("");
    // const [currentDate, setCurrentDate] = useState(new Date())
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
    LocaleConfig.defaultLocale = "ru";
    return (
        <View>
            <ScrollView
                style={{ marginBottom: 10, height: 580 }}
                // StickyHeaderComponent={

                // }
                horizontal={false}
                stickyHeaderIndices={[1]}
                invertStickyHeaders={true}
            >
                <View>
                    <Calendar
                        style={{
                            borderWidth: 1,
                            borderColor: "gray",
                            // maxHeight: 500,
                        }}
                        // scrollEnabled={true}
                        // pagingEnabled={true}
                        // horizontal={false}
                        firstDay={1}
                        // enableSwipeMonths={true}
                        theme={calendarTheme}
                        // hideExtraDays={true}
                        monthFormat="MMM/yyyy"
                        customHeaderTitle={
                            <View>
                                <Pressable
                                    onPress={() => {
                                        setOpenModal(true);
                                    }}>
                                    <Text>
                                        {currentDate.toLocaleString("default", {
                                            year: "numeric",
                                            month: "long",
                                        })}
                                    </Text>
                                </Pressable>
                            </View>
                        }
                        markingType="multi-dot"
                        onDayPress={(day) => {
                            console.log(day);

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
                                        height: 120,
                                        borderWidth: 0.2,
                                        borderColor: "#a0a0a0",
                                        margin: 0,
                                        paddingVertical: 5,
                                        // backgroundColor:"orange"
                                        backgroundColor:
                                            selected == date.dateString
                                                ? "orange"
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

                                    <ScrollView
                                        showsVerticalScrollIndicator={true}>
                                        {marking?.dots?.map((item, index) => (
                                            <View key={item.key}>
                                                {
                                                    // index<3 &&
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
                                                            flex: 1,
                                                        }}>
                                                        {item.key}
                                                    </Text>
                                                }
                                                {index == 3 && <Text>...</Text>}
                                            </View>
                                        ))}
                                        {/* <Text>{marking?.dots.length > 2? "...":""}</Text> */}
                                    </ScrollView>
                                    {/* <Text style={{fontSize:15}}>Дело 1</Text>
                            <Text>Дело 3</Text> */}
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
                        onMonthChange={(date) =>
                            setCurrentDate(new Date(date.dateString))
                        }
                        date={timeToString(currentDate)}
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

const stickyComponent: FunctionComponent = () => {
    return (
        <TouchableOpacity
            style={{
                alignSelf: "stretch",
                alignContent: "flex-end",
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
    );
};
