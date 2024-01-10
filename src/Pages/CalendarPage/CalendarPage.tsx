import { View } from "react-native";
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
import MiniTimer from "@components/MiniTimer";

export default function CalendarPage({navigation}) {
    const [currentDate, setCurrentDate] = useState<string>(
        new Date().toISOString()
    );
    const [openModal, setOpenModal] = useState(false);
    const {tasks,typesTask} = useAppSelector((state) => state.tasksDates);
    const [markedDates, setMarkedDates] = useState<MarkedDates>(
        {} as MarkedDates
    );
    let countTask = useRef(0);
    let monthYear = moment(currentDate).format("MM-yyyy");
    const getTypeColor = (type:string)=>{
        const findItem = typesTask.find(element=>element.key == type)
        return findItem ?findItem.color:"white"
    }
    useEffect(() => {
        let map = tasks.reduce((acc, cur) => {
            acc[cur.date] = acc[cur.date] || {
                dots: [],
            };
            acc[cur.date].dots.push({
                key: cur.name,
                color: getTypeColor(cur.type),
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
                    bottom: "6%",
                    right: 8,
                }}>
                <AddTask currentDate={currentDate} />
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom: "7%",
                    left: 30,
                }}>
                <MiniTimer navigation={navigation}/>
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
