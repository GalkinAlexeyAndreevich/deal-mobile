import { SafeAreaView, ScrollView, Text, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CustomCalendar from "./Calendar";
import { MarkedDates } from "react-native-calendars/src/types";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { timeToString } from "@utils/timeToString";
import AddTask from "@components/AddTask";
import moment from "moment";

export default function CalendarPage() {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [markedDates, setMarkedDates] = useState<MarkedDates>(
        {} as MarkedDates
    );
    let countTask = useRef(0)
    let monthYear = moment(currentDate).format("MM-yyyy")
    const windowHeight = Dimensions.get("window").height;
    useEffect(() => {
        let map = tasks.reduce((acc, cur) => {

            acc[cur.date] = acc[cur.date] || {
                dots: [],
            };
            acc[cur.date].dots.push({
                key: cur.name,
                color: cur.color || "#a6fcaa",
            });
            // countTask.current +=1
            return acc;
        }, {});
        setMarkedDates(map);
        countTask.current = tasks.length
        console.log("Объедиение по полю", map);   
    }, [monthYear, tasks]);

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
                    countTask={countTask.current}
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
