import { View, Text, Pressable } from "react-native";
import React from "react";
import moment from "moment";
import { DateData } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

type countOnWeek = {
	[key: number]: number;
};

interface Props{
	date:string & DateData;
	countOnWeek:countOnWeek;
	setCurrentDate:(date:string)=>void
	currentDate:string
	marking:MarkingProps
}

export default function DayComponent({date,countOnWeek,setCurrentDate,currentDate,marking}:Props) {
	const getHeightOnCount = (date: string) => {
		if (!countOnWeek) return 100;
		const week = moment(date).isoWeek();
		let sum = 75 + 40 * (countOnWeek[week] || 0);
		return sum;
	};
    return (
        <Pressable
            onPress={() => {
                console.log("selected day", date.dateString);
                setCurrentDate(date.dateString);
            }}
            style={{
                width: 55,
                height: getHeightOnCount(date.dateString),
                borderWidth: 0.2,
                borderColor: "#a0a0a0",
                marginBottom: 0,
                borderBottomWidth: 1,
                paddingVertical: 5,
                backgroundColor:
                    currentDate == date.dateString ? "#e4f7fe" : "white",
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
                    </View>
                );
            })}
        </Pressable>
    );
}
