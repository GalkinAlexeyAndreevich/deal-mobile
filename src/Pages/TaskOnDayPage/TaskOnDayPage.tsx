import { View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import Tasks from "./components/Tasks";
import AddTask from "@components/AddTask";
import ChangeDate from "./components/ChangeDate";
import MiniTimer from "@components/MiniTimer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/routes/TabNavigator";


type Props = NativeStackScreenProps<RootStackParamList, 'TaskOnDayPage'>;

export default function TaskOnDayPage({navigation,route}:Props) {
    const [currentDate, setCurrentDate] = useState<string>(
        new Date().toISOString()
    );
    const {dateNow} = route.params
    useEffect(()=>{
        if(!dateNow)return
        setCurrentDate(dateNow)
    },[dateNow])
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
                    height: "85.5%",
                    borderWidth: 1,
                    marginHorizontal: 14,
                    marginBottom: 0,
                    borderColor: "#acf9ff",
                    paddingBottom:25
                }}>
                <Tasks navigation={navigation} currentDate={moment(currentDate).format("YYYY-MM-DD")} />
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: "2%",
                    right: 8,
                }}>
                <AddTask currentDate={currentDate} />
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom: "3%",
                    left: 30,
                }}>
                <MiniTimer navigation={navigation}/>
            </View>
        </View>
    );
}
