import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { timeToString } from "@utils/timeToString";

interface Props {
    currentDate: string;
    setCurrentDate: (date: string) => void;
}

export default function ChangeDate({ currentDate, setCurrentDate }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const addAndSubtractDay = (add: boolean) => {
        let newDate = "";
        if (add) {
            newDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
        } else {
            newDate = moment(currentDate)
                .subtract(1, "days")
                .format("YYYY-MM-DD");
        }
        setCurrentDate(timeToString(newDate));
    };
    const changeDatePicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date | undefined
    ) => {
        setOpenModal(false);
        if (type === "set" && selectedData) {  
            setCurrentDate(timeToString(selectedData));
        } 
    };

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginVertical:2
            }}>
            <Pressable
                style={{ padding: 5 }}
                onPress={() => addAndSubtractDay(false)}>
                <Ionicons name="caret-back-sharp" size={13} color={"#00adf5"} />
            </Pressable>

            <Pressable
                style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    paddingVertical: 5,
                    marginBottom: 5,
                }}
                onPress={() => setOpenModal(true)}>
                <Text
                    style={{
                        fontSize: 21,
                        backgroundColor: "#dafffd",
                        borderWidth: 1,
                        // borderTopWidth:1,
                        // borderBottomWidth:0.8,
                        borderColor: "#a0f7ff",
                        paddingHorizontal: 35,
                        paddingVertical: 5,
                    }}>
                    {moment(currentDate).format("D MMMM")}
                </Text>
            </Pressable>
            <Pressable
                // style={{ padding: 10 }}
                onPress={() => addAndSubtractDay(true)}>
                <Ionicons
                    name="caret-forward-sharp"
                    size={13}
                    color={"#00adf5"}
                />
            </Pressable>
            {openModal && (
                <RNDateTimePicker
                    value={new Date(currentDate)}
                    onChange={changeDatePicker}
                />
            )}
        </View>
    );
}
