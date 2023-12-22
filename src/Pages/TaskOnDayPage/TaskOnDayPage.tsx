import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Tasks from "./components/Tasks";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { timeToString } from "@utils/timeToString";
import AddTask from "@components/AddTask";

moment().locale("ru");

export default function TaskOnDayPage() {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useAppDispatch();

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
        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                // opacity:0.8,
               
            }}>
            <Pressable
                style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    paddingVertical: 5,
                    marginBottom:5
 
                }}
                onPress={() => setOpenModal(true)}>
                <Text style={{ fontSize: 20,backgroundColor: "#dafffd",  
                    borderWidth:1,                
                    // borderTopWidth:1,
                    // borderBottomWidth:0.8,
                    borderColor: "#a0f7ff",
                    paddingHorizontal:35,
                    paddingVertical:5
                }}>
                    {moment(currentDate).format("DD MMMM")}
                </Text>
            </Pressable>
            <View style={{
                height:"81.5%",
                borderWidth:1,
                marginHorizontal:14,
                marginBottom:0,
                borderColor:"#acf9ff"
            }}>
                <Tasks />
            </View>
            
            <View
                style={{
                    position: "absolute",
                    top: 670,
                    right: -5,
                }}>
                <AddTask />
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
