import { View, Text,TextInput } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { Button, CheckBox } from "react-native-elements";
import { defaultTasks } from "@utils/dataNoFetch";
import { SubTask, Task } from "@interfaces";
import { useAppSelector } from "@store/hook";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

moment().locale("ru");

const paddingOnLevel = {
    0: 10,
    1: 25,
    2: 40,
};

export default function TaskOnDayPage() {
    const [tasks, setTasks] = useState<Task[]>(defaultTasks);
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    // const [currentDate, setCurrentDate] = useState(new Date());

    const changeTask = (task: Task) => {
        const found = tasks.find((element) => element.id === task.id);
        const newState = tasks.map((el) =>
            el.id === task.id ? { ...el, done: !el.done } : el
        );
        console.log(newState);

        setTasks(newState);
    };

    const changeSub = (sub: SubTask, task: Task) => {
        console.log("change sub");

        let found = tasks.find((element) => element.id === task.id);
        let subtasks = found.subtasks.find((element) => element.id === sub.id);
        console.log(found, subtasks);

        subtasks.done = !subtasks.done;
        // Если хоть задание было выполнено, но мы отменили выполнение подзадания, задание будет отменено
        if (found.done && !subtasks.done) {
            found.done = false;
        } else {
            // Если вы подзадания будут выполнены, задание будет выполнено
            let checkOnDone = true;
            for (let item of found.subtasks) {
                if (!item.done) checkOnDone = false;
            }
            if (checkOnDone) {
                found.done = true;
            }
        }
        const newState = tasks.map((el) => (el.id === task.id ? found : el));
        setTasks(newState);
    };

    const changeNameTask = (text: string, task: Task, subtask:SubTask= null) => {
        console.log(text, task);
        if (!text) return;
        let found = tasks.find((element) => element.id === task.id);
        if(subtask){
            let sub = found.subtasks.find((element) => element.id === subtask.id)
            sub.name = text
        }
        else{
            found.name=text
        }
        console.log("Chnage sub",found.subtasks.find((element) => element.id === subtask.id));
        
        const newState = tasks.map((el) => (el.id === task.id ? found : el));
        setTasks(newState);
    };

    return (
        <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Цели на {moment(currentDate).format("DD MMMM")}
            </Text>
            {tasks.map((task) => (
                <View key={task.id}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <CheckBox
                            size={20}
                            checked={task.done}
                            disabled={task.subtasks?.length > 0}
                            onPress={() => changeTask(task)}
                            checkedColor="red"
                        />
                        <TextInput
                            style={{
                                margin: 0,
                                padding: 0,
                                textDecorationLine: task.done
                                    ? "line-through"
                                    : "none",
                            }}
                            value={task.name}
                            // multiline={true}
                            onChangeText={(text) => changeNameTask(text, task)}
                        />
                        <View>
                            <Icon name="delete" size={15}/> 
                        </View>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",

                            // alignItems: "center",
                        }}>
                        {task?.subtasks.length && task.subtasks.map((sub) => (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingLeft: 15,
                                }}
                                key={sub.id}>
                                <CheckBox
                                    size={20}
                                    checked={sub.done}
                                    onPress={() => changeSub(sub, task)}
                                    checkedColor="red"
                                />
                                <TextInput
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        textDecorationLine: sub.done
                                            ? "line-through"
                                            : "none",
                                    }}
                                    value={sub.name}
                                    // multiline={true}
                                    onChangeText={(text) =>
                                        changeNameTask(text,task, sub)
                                    }
                                />
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
}
