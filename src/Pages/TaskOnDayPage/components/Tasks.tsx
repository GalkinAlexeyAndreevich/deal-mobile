import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { CheckBox } from "react-native-elements";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { SubTask, Task } from "@interfaces";
import { setTasks } from "@store/tasksDatesSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Subtasks from "./Subtasks";

export default function Tasks() {
    const { tasks, currentDate } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [filtered, setFiltered] = useState<Task[]>([]);

    useEffect(() => {
        let filteredArr = [];
        for (let item of tasks) {
            if (item.date == currentDate) {
                filteredArr.push(item);
            }
        }
        setFiltered(filteredArr);
    }, [tasks, currentDate]);

    const changeTask = (task: Task) => {
        let found = tasks.find((element) => element.id === task.id);
        found.done = !found.done;
        if (found?.subtasks?.length) {
            if (found.done) {
                for (let item of found.subtasks) {
                    item.done = true;
                }
            } else {
                for (let item of found.subtasks) {
                    item.done = false;
                }
            }
        }
        const newState = tasks.map((el) => (el.id === task.id ? found : el));
        dispatch(setTasks(newState));
    };

    const changeNameTask = (
        text: string,
        task: Task,
        subtask: SubTask = null
    ) => {
        if (!text) return;
        let found = tasks.find((element) => element.id === task.id);
        if (subtask) {
            let sub = found.subtasks.find(
                (element) => element.id === subtask.id
            );
            sub.name = text;
        } else {
            found.name = text;
        }
        const newState = tasks.map((el) => (el.id === task.id ? found : el));
        dispatch(setTasks(newState));
    };
    return (
        <View>
            {filtered.length == 0 && (
                <View
                    style={{
                        height: "80%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text style={{ fontSize: 20, color: "#a7ceff" }}>
                        У вас не целей на этот день,
                    </Text>
                    <Text style={{ fontSize: 20, color: "#a7ceff" }}>
                        но вы можете их добавить.
                    </Text>
                </View>
            )}
            {filtered.map((task) => (
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
                                fontSize: 20,
                            }}
                            value={task.name}
                            // multiline={true}
                            onChangeText={(text) => changeNameTask(text, task)}
                        />
                        <View>
                            <Icon name="delete" size={15} />
                        </View>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        {task?.subtasks?.length > 0 &&
                            task.subtasks.map((sub) => (
                                <Subtasks
                                    key={sub.id}
                                    sub={sub}
                                    task={task}
                                    changeNameTask={changeNameTask}
                                />
                            ))}
                    </View>
                </View>
            ))}
        </View>
    );
}
