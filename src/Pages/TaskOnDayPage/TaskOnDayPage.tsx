import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import Tasks from "./components/Tasks";
import AddTask from "@components/AddTask";
import ChangeDate from "./components/ChangeDate";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { TaskStackParamList } from "@src/routes/TaskNavigator";
import MiniTimer from "@src/components/MiniTimer";


type Props = NativeStackScreenProps<TaskStackParamList, 'TaskOnDayPage'>;

export default function TaskOnDayPage({navigation,route}:Props) {
    const [currentDate, setCurrentDate] = useState<string>(
        new Date().toISOString()
    );
    const dateNow = route.params?.dateNow
    useEffect(()=>{
        if(!dateNow)return
        setCurrentDate(dateNow)
    },[dateNow])
    return (
        <View style={styles.container}>
            <ChangeDate
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
            />
            <View style={styles.taskBlock}>
                <Tasks navigation={navigation} currentDate={moment(currentDate).format("YYYY-MM-DD")} />
            </View>
            <View style={styles.addTask}>
                <AddTask currentDate={currentDate} />
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom: "3%",
                    left: 30,
                }}>
                <MiniTimer navigation={navigation.getParent()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        flex: 1,
        paddingVertical: 5,
    },
    taskBlock:{
        height: "85.5%",
        borderWidth: 1,
        marginHorizontal: 14,
        marginBottom: 0,
        borderColor: "#acf9ff",
        paddingBottom:25
    },
    addTask:{
        position: "absolute",
        bottom: "2%",
        right: 8,
    }
})
