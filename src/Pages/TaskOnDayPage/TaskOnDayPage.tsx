import { View, Text,TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Tasks from "./components/Tasks";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { timeToString } from "@utils/timeToString";


moment().locale("ru");

export default function TaskOnDayPage() {
    
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useAppDispatch()

    const changeDatePicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date
    ) => {
        if (type === "set") {
            setOpenModal(false);
            dispatch(setCurrentDate(timeToString(selectedData)));
        } else {
            setOpenModal(false);
        }
    };

    return (
        <View>
            <Pressable onPress={()=>setOpenModal(true)}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Цели на {moment(currentDate).format("DD MMMM")}
                </Text>
            </Pressable>

            <Tasks />

            {openModal && (
                <RNDateTimePicker
                    value={new Date(currentDate)}
                    onChange={changeDatePicker}
                />
            )}
           
        </View>
    );
}
