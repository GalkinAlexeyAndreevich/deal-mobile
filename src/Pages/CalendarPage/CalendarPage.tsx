import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CustomCalendar from "./Calendar";
import { MarkedDates } from "react-native-calendars/src/types";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";

const timeToString = (time: any): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

export default function CalendarPage() {
    const [selected, setSelected] = useState("");
    const currentDate = useAppSelector(state=>state.tasksDates.currentDate)
    const dispatch = useAppDispatch()
    // const [currentDate, setCurrentDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        console.log("тест",currentDate);
        
    },[currentDate])

    let markedDates: MarkedDates = { 
        "2023-10-31": {
            dots: [
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
            ],
        },       
        "2023-10-10": {
            dots: [
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
            ],
        },
        "2023-10-12": {
            dots: [
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
            ],
        },
        "2023-11-10": {
            dots: [
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
            ],
        },
        "2023-11-11": {
            dots: [
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
            ],
        },
        "2023-11-15": {
            dots: [
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
            ],
        },
        "2023-11-20": {
            marked: true, selectedColor: 'blue',
            textColor:"white",
            dots: [
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
                { key: "test1", color: "#ffc4c4",  },
                { key: "test3", color: "#ffcdfc",  },
                { key: "test", color: "#dbd1fe",  },
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
                { key: "workout", color: "#a6fcaa" },
                { key: "massage", color: "#fff272",  },
            ],
        },
    };

    const changeMonthPicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date
    ) => {
        if (type === "set") {
            setOpenModal(!openModal);
            console.log("set",selectedData);
            
            dispatch(setCurrentDate(timeToString(selectedData)));
            console.log(currentDate);
            

        } else {
            setOpenModal(!openModal);
        }
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomCalendar
                markedDates={markedDates}
                setOpenModal={setOpenModal}
            />
            {openModal && (
                <RNDateTimePicker
                    value={new Date(currentDate)}
                    onChange={changeMonthPicker}
                />
            )}
        </ScrollView>
    );
}
