import { ScrollView, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CustomCalendar from "./Calendar";
import { MarkedDates } from "react-native-calendars/src/types";
import { useAppSelector } from "@store/hook";
import { timeToString } from "@utils/timeToString";
import AddTask from "@components/AddTask";
import moment from "moment";

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState<string>(
        new Date().toISOString()
    );
    const [openModal, setOpenModal] = useState(false);
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [markedDates, setMarkedDates] = useState<MarkedDates>(
        {} as MarkedDates
    );
    let countTask = useRef(0);
    let monthYear = moment(currentDate).format("MM-yyyy");
    useEffect(() => {
        let map = tasks.reduce((acc, cur) => {
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
        countTask.current = tasks.length;
        console.log("Объедиение по полю", map);
    }, [monthYear, tasks]);

    const changeDatePicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date
    ) => {
        setOpenModal(false);
        if (type === "set") {
            setCurrentDate(timeToString(selectedData));
        }
    };
    return (
        <View style={{ flex: 1, paddingVertical: 5, backgroundColor: "white" }}>
            <CustomCalendar
                markedDates={markedDates}
                setOpenModal={setOpenModal}
                countTask={countTask.current}
                currentDate={moment(currentDate).format("YYYY-MM-DD")}
                setCurrentDate={setCurrentDate}
            />
            <View
                style={{
                    position: "absolute",
                    bottom: "8%",
                    right: 10,
                }}>
                <AddTask currentDate={currentDate} />
            </View>

            {openModal && (
                <RNDateTimePicker
                    value={new Date(currentDate)}
                    onChange={changeDatePicker}
                />
            )}
        </View>
    );
}
