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
    navigation: NativeStackNavigationProp<RootStackParamList, "CalendarPage">;
}

export default function DayComponent({
    date,
    countOnWeek,
    setCurrentDate,
    currentDate,
    marking,
    navigation,
}: Props) {
    const lastPress = useRef(Date.now());
    const getHeightOnCount = (date: string) => {
        if (!countOnWeek) return 70;
        const week = moment(date).isoWeek();
        if (!countOnWeek[week]) return 70;
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
            navigation.navigate("TasksOnDayPage", {
                screen: "TaskOnDayPage",
                params: { dateNow: date.dateString },
            });
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
                minHeight: 70,
                borderWidth: 0.25,
                borderColor: "#e4e3e3",
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
            <View style={{ flexGrow: 1 }}>
                {marking?.dots?.map((item, index) => {
                    return (
                        <View style={{
                            display:'flex', 
                            justifyContent:'center',
                            alignItems:'center',
                            paddingVertical: 1,
                            marginVertical: 3,
                            backgroundColor: item?.color,
                            }} key={index}>
                                <View style={{width:"96%"}}>
                                    <Text
                                        android_hyphenationFrequency="full"
                                        textBreakStrategy="simple"
                                        lineBreakStrategyIOS="hangul-word"
                                        style={{
                                            width:"100%",
                                            textAlign: "center",
                                            fontSize: 10,
                                        }}>
                                        <Text>{hyphenatedText(item.key || "")}</Text>
                                    </Text>
                                </View>
     
                        </View>

                    );
                })}
            </View>
        </Pressable>
    );
}
// <Text
//     key={index}
//     android_hyphenationFrequency="full"
//     textBreakStrategy="highQuality"
//     lineBreakStrategyIOS='hangul-word'
//     style={{
//         backgroundColor: item?.color,
//         paddingVertical: 3,
//         marginVertical: 3,
//         marginHorizontal: 2,
//         textAlign:'center',
//         fontSize: 10,
//     }}>
//     <Text
//         android_hyphenationFrequency="full"
//         textBreakStrategy="highQuality"
//     >
//         {hyphenatedText(item.key || "")}
//     </Text>
// </Text>
