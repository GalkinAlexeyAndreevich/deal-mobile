import { View, TextInput } from "react-native";
import React from "react";
import { useAppDispatch } from "@store/hook";
import { setSubtask } from "@store/tasksDatesSlice";
import { CheckBox } from "react-native-elements";
import { SubTask, Task } from "@interfaces";

interface Props {
    task: Task;
    subtask:SubTask;
    changeNameTask: (text: string, task: Task, subtask?: SubTask) => void;
}

export default function Subtasks({ subtask, task, changeNameTask }:Props) {
    const dispatch = useAppDispatch();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
            }}>
            <CheckBox
                size={20}
                checked={subtask.done}
                onPress={() => dispatch(setSubtask({subtaskId:subtask.id,taskId:task.id}))}
                checkedColor="red"
                checkedIcon='dot-circle-o' 
                uncheckedIcon='circle-o' 
            />
            <TextInput
                style={{
                    margin: 0,
                    padding: 0,
                    textDecorationLine: subtask.done ? "line-through" : "none",
                }}
                value={subtask.name}
                onChangeText={(text) => changeNameTask(text, task, subtask)}
            />
        </View>
    );
}
