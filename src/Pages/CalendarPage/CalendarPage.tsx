import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CustomCalendar from "./Calendar";
import { MarkedDates } from "react-native-calendars/src/types";

export default function CalendarPage() {
    const [selected, setSelected] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);

    let markedDates: MarkedDates = {
        "2023-11-20": {
            marked: true, selectedColor: 'blue',
            textColor:"white",
            dots: [
                { key: "workout", color: "green", selectedDotColor:"aqua",  },
                { key: "massage", color: "yellow",  },
                { key: "test1", color: "yellow",  },
                { key: "test3", color: "yellow",  },
                { key: "test", color: "yellow",  },
            ],
            customStyles: {
                container: {
                  backgroundColor: 'green'
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold'
                }
              },
            selectedTextColor:"orange"
            // selectedColor: 'orange'
        },
        "2023-11-21": {
            dots: [
                { key: "workout", color: "green" },
                { key: "massage", color: "yellow" },
            ],
        },
    };

    const changeMonthPicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date
    ) => {
        if (type === "set") {
            setOpenModal(!openModal);
            setCurrentDate(selectedData);
        } else {
            setOpenModal(!openModal);
        }
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomCalendar
                markedDates={markedDates}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                setOpenModal={setOpenModal}
            />
            {openModal && (
                <RNDateTimePicker
                    value={currentDate}
                    onChange={changeMonthPicker}
                />
            )}
        </ScrollView>
    );
}
