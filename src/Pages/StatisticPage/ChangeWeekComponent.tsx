import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";

interface IProps{
	currentWeek:Date,
	setCurrentWeek:(date:Date)=>void
}

export default function ChangeWeekComponent({currentWeek, setCurrentWeek}:IProps) {
    const getWeekString = (date: Date) => {
        const selectedWeekStart = moment(date).startOf("week").format("DD/MM");
        const selectedWeekEnd = moment(date).endOf("week").format("DD/MM");
        return `${selectedWeekStart} - ${selectedWeekEnd}`;
    };

    const goToPreviousWeek = () => {
        const newDate = new Date(
            currentWeek.setDate(currentWeek.getDate() - 7)
        );
        setCurrentWeek(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(
            currentWeek.setDate(currentWeek.getDate() + 7)
        );
        setCurrentWeek(newDate);
    };
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "flex-start",
                marginLeft: 10,
                width: Dimensions.get("window").width - 20,
                justifyContent: "space-between",
            }}>
            <Text style={{ fontSize: 15 }}>Выполненные задачи (неделя)</Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Pressable style={{ padding: 5 }} onPress={goToPreviousWeek}>
                    <Ionicons
                        name="caret-back-sharp"
                        size={13}
                        color={"#00adf5"}
                    />
                </Pressable>
                <Text>{getWeekString(currentWeek)}</Text>
                <Pressable style={{ padding: 5 }} onPress={goToNextWeek}>
                    <Ionicons
                        name="caret-forward-sharp"
                        size={13}
                        color={"#00adf5"}
                    />
                </Pressable>
            </View>
        </View>
    );
}
