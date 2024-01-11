import { View } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import Tasks from "./components/Tasks";
import AddTask from "@components/AddTask";
import ChangeDate from "./components/ChangeDate";
import MiniTimer from "@components/MiniTimer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/routes/TabNavigator";

interface IPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TaskOnDayPage'>;
 }

export default function TaskOnDayPage({navigation}:IPageProps) {
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
                    // flex:1,
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
        </View>
    );
}
