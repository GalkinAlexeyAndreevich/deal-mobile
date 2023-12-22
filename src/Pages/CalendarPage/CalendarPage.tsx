import { SafeAreaView, ScrollView, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CustomCalendar from "./Calendar";
import { MarkedDates } from "react-native-calendars/src/types";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { timeToString } from "@utils/timeToString";
import AddTask from "@components/AddTask";

export default function CalendarPage() {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [markedDates, setMarkedDates] = useState<MarkedDates>(
        {} as MarkedDates
    );

    const windowHeight = Dimensions.get("window").height;
    useEffect(() => {
        let map = tasks.reduce((acc, cur) => {
            console.log(cur.date);

            acc[cur.date] = acc[cur.date] || {
                dots: [],
            };
            acc[cur.date].dots.push({
                key: cur.name,
                color: cur.color || "#a6fcaa",
            });
            return acc;
        }, {});
        setMarkedDates(map);
        console.log("Объедиение по полю", map);
    }, [currentDate, tasks]);

    const changeDatePicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date
    ) => {
        setOpenModal(false);
        if (type === "set") {
            dispatch(setCurrentDate(timeToString(selectedData)));
        }
    };
    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    height: windowHeight - 130,
                    backgroundColor: "white",
                }}>
                <CustomCalendar
                    markedDates={markedDates}
                    setOpenModal={setOpenModal}
                />

                <AddTask />

                {openModal && (
                    <RNDateTimePicker
                        value={new Date(currentDate)}
                        onChange={changeDatePicker}
                    />
                )}
            </View>
        </ScrollView>
    );
}
