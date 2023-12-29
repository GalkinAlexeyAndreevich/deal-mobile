import { View, TextInput } from "react-native";
import React from "react";
import { useAppDispatch } from "@store/hook";
import { setStatusTask } from "@store/tasksDatesSlice";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SubTask, Task } from "@interfaces";

interface Props {
    task: Task;
    changeNameTask: (text: string, task: Task, subtask?: SubTask) => void;
}

export default function TaskItem({ task, changeNameTask }: Props) {
    const dispatch = useAppDispatch();

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}>
            <CheckBox
                size={20}
                checked={task.done}
                onPress={() => dispatch(setStatusTask(task))}
                checkedColor="red"
            />
            <TextInput
                style={{
                    margin: 0,
                    padding: 0,
                    textDecorationLine: task.done ? "line-through" : "none",
                    fontSize: 20,
                }}
                value={task.name}
                onChangeText={(text) => changeNameTask(text, task)}
            />
            <View>
                <Icon name="delete" size={15} />
            </View>
        </View>
    );
}
