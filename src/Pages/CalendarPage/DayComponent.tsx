import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { DateData } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import Hypher from 'hypher';
import russian from 'hyphenation.ru';

const h = new Hypher(russian);

type countOnWeek = {
    [key: number]: {
        textLength:number,
        countTask:number,
        maxLength:number
    };
};

interface Props{
	date:string & DateData;
	countOnWeek:countOnWeek;
	setCurrentDate:(date:string)=>void
	currentDate:string
	marking:MarkingProps | undefined
}

export default function DayComponent({date,countOnWeek,setCurrentDate,currentDate,marking}:Props) {
    // const [heightDay, setHeightDay] = useState(50) 
	const getHeightOnCount = (date: string) => {
		if (!countOnWeek) return 50;   
		const week = moment(date).isoWeek();
        if(!countOnWeek[week]) return 50
        if(countOnWeek[week].textLength < 10) return 70 *(countOnWeek[week].countTask >0?countOnWeek[week].countTask:1) 
        let sum = 50 + countOnWeek[week].maxLength     
		return sum;
	};
    const hyphenatedText = (text: string): string => {
        return text
            .split(' ')
            .map((word) => word.split('').join('\u00AD'))
            .join(' ');
    }
    
    const maxWeek = Math.max.apply(null, Object.keys(countOnWeek).map(Number));    
    return (
        <Pressable
            onPress={() => {
                console.log("selected day", date.dateString);
                setCurrentDate(date.dateString);
            }}
            style={{
                width: "100%",
                height: getHeightOnCount(date.dateString),
                borderWidth: 0.2,
                borderColor: "#a0a0a0",
                borderBottomWidth: moment(date.dateString).isoWeek()===maxWeek?1:0.2,
                backgroundColor:
                    currentDate == date.dateString ? "#e8ffe3" : "white",
            }}>
            <Text
                style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: 15,
                    paddingLeft: 3,
                    fontWeight:moment().format('LL')==moment(date.dateString).format('LL')?'bold':'normal',
                }}>
                {date.day}{" "}
            </Text>
            {marking?.dots?.map((item, index) => {
                return (
                    <View style={{
                        backgroundColor: item?.color,
                        paddingVertical: 3,
                        marginVertical: 3,
                        marginHorizontal:2,
                        borderWidth:item?.color == "white"?0.2:0
                    }} key={index}>
                        <Text
                            // textBreakStrategy="highQuality"
                            android_hyphenationFrequency="full"
                            style={{
                                color: item?.selectedDotColor,
                                fontSize: 10,
                                textAlign: "center",  
                            }}>
                            {h.hyphenateText(item.key || "")}
                        </Text>
                    </View>
                );
            })}
        </Pressable>
    );
}
