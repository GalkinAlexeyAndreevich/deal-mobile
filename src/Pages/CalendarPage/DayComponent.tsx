import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAppDispatch } from "@store/hook";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { DotProps } from "react-native-calendars/src/calendar/day/dot";
import { DateData } from "react-native-calendars";

interface Props {
    date: string & DateData;
		selected:string;
    marking: MarkingProps;
}

export default function DayComponent({ date, selected, marking }:Props) {
    const dispatch = useAppDispatch();
    return (
        <Pressable
            onPress={() => {
                console.log("selected day", date.dateString);
                dispatch(setCurrentDate(date.dateString));
                // setSelected(date.dateString);
            }}
            style={{
                width: 55,
                height: 200,
                borderWidth: 0.2,
                borderColor: "#a0a0a0",
                margin: 0,
                paddingVertical: 5,
                backgroundColor:
                    selected == date.dateString ? "#e4f7fe" : "white",
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

            {marking?.dots?.map((item, index) => (
                <View key={item.key}>
                    {
                        // index<3 &&
                        <Text
                            style={{
                                backgroundColor: item?.color,
                                color: item?.selectedDotColor,
                                paddingVertical: 3,
                                marginVertical: 3,
                                fontSize: 10,
                                borderRadius: 50,
                                textAlign: "center",
                            }}>
                            {item.key}
                        </Text>
                    }
                    {/* {index == 3 && <Text>...</Text>} */}
                </View>
            ))}
        </Pressable>
    );
}
