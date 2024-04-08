import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { DateData } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import Hypher from "hypher";
import russian from "hyphenation.ru";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@src/routes/TabNavigator";

const h = new Hypher(russian);

type countOnWeek = {
    [key: number]: {
        textLength: number;
        countTask: number;
        maxLength: number;
    };
};

interface Props {
    date: string & DateData;
    countOnWeek: countOnWeek;
    setCurrentDate: (date: string) => void;
    currentDate: string;
    marking: MarkingProps | undefined;
    navigation:NativeStackNavigationProp<RootStackParamList, "CalendarPage">
}

export default function DayComponent({
    date,
    countOnWeek,
    setCurrentDate,
    currentDate,
    marking,
    navigation
}: Props) {
    const lastPress = useRef(Date.now());
    const getHeightOnCount = (date: string) => {
        if (!countOnWeek) return 50;
        const week = moment(date).isoWeek();
        if (!countOnWeek[week]) return 50;
        if (countOnWeek[week].textLength < 10)
            return (
                70 *
                (countOnWeek[week].countTask > 0
                    ? countOnWeek[week].countTask
                    : 1)
            );
        let sum = 50 + countOnWeek[week].maxLength;
        return sum;
    };
    const handlePress = () => {
        const now = Date.now();
        if (now - lastPress.current <= 300) {
            lastPress.current = 0; // reset
            navigation.navigate("TasksOnDayPage",{
                screen:'TaskOnDayPage',
                params:{dateNow:date.dateString}
            })
        } else {
          lastPress.current = now;
          setTimeout(() => {
            if (lastPress.current !== 0) {
                setCurrentDate(date.dateString);  
                lastPress.current = 0; // reset
            }
          }, 300);
        }
    };
    const hyphenatedText = (text: string): string => {
        return h.hyphenateText(text);
    };

    const maxWeek = Math.max.apply(null, Object.keys(countOnWeek).map(Number));
    return (
        <Pressable
            onPress={handlePress}
            style={{
                width: "100%",
                height: getHeightOnCount(date.dateString),
                borderWidth: 0.2,
                borderColor: "#a0a0a0",
                borderBottomWidth:
                    moment(date.dateString).isoWeek() === maxWeek ? 1 : 0.2,
                backgroundColor:
                    currentDate == date.dateString ? "#e8ffe3" : "white",
            }}>
            <Text
                style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: 15,
                    paddingLeft: 3,
                    fontWeight:
                        moment().format("LL") ==
                        moment(date.dateString).format("LL")
                            ? "bold"
                            : "normal",
                }}>
                {date.day}{" "}
            </Text>
            <View style={{ flex: 1 }}>
                {marking?.dots?.map((item, index) => {
                    return (
                        <View key={index}
                            style={{
                                backgroundColor: item?.color,
                                paddingHorizontal:1.2,
                                paddingVertical: 3,
                                marginVertical: 3,
                                marginHorizontal: 2,
                            }}>
                            <Text
                                android_hyphenationFrequency="full"
                                textBreakStrategy="simple"
                                style={{
                                    borderWidth:
                                        item?.color == "white" ? 0.2 : 0,
                                    color: item?.selectedDotColor,
                                    width:'100%',
                                    fontSize: 10,
                                    textAlign: "center",
                                }}>
                                
                                {hyphenatedText(item.key || "")}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </Pressable>
    );
}
