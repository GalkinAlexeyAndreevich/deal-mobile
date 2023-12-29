import { View } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import Tasks from "./components/Tasks";
import AddTask from "@components/AddTask";
import ChangeDate from "./components/ChangeDate";

export default function TaskOnDayPage() {
    const [currentDate, setCurrentDate] = useState<string>(
        new Date().toISOString()
    );
    return (
        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                paddingVertical: 5,
            }}>
            <ChangeDate
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
            />

            <View
                style={{
                    height: "81.5%",
                    borderWidth: 1,
                    marginHorizontal: 14,
                    marginBottom: 0,
                    borderColor: "#acf9ff",
                }}>
                <Tasks currentDate={moment(currentDate).format("YYYY-MM-DD")} />
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: "8%",
                    right: 10,
                }}>
                <AddTask currentDate={currentDate} />
            </View>
        </View>
    );
}
