import { View, Text, Pressable, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            <Pressable
                style={{ padding: 5 }}
                onPress={() => addAndSubtractDay(false)}>
                <Ionicons name="caret-back-sharp" size={13} color={"#00adf5"} />
            </Pressable>

            <Pressable style={styles.button}
                onPress={() => setOpenModal(true)}>
                <Text style={styles.buttonText}>
                    {moment(currentDate).format("D MMMM")}
                </Text>
            </Pressable>
            <Pressable
                style={{ padding: 5 }}
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

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical:2
    },
    button:{
        display: "flex",
        alignItems: "center",
        paddingVertical: 5,
        marginBottom: 5,
    },
    buttonText:{
        fontSize: 21,
        backgroundColor: "#dafffd",
        borderWidth: 1,
        borderColor: "#a0f7ff",
        paddingHorizontal: 35,
        paddingVertical: 5,
    }
})
