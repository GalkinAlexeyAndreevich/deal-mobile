import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import type { Task } from "@src/interfaces";
import { useAppDispatch } from "@src/store/hook";
import { setNameTask } from "@src/store/tasksDatesSlice";

interface Props {
    task: Task;
}

export default function TaskInput({ task }: Props) {
    const dispatch = useAppDispatch();
    const changeNameTask = (text: string, task: Task) => {
        if (!text) return;
        console.log(text, task.id);
        dispatch(setNameTask({ text, taskId: task.id, subtaskId: undefined }));
    };
    return (
        <TextInput
            underlineColorAndroid="transparent"
            // ref={inputRef}
            style={styles.input}
            multiline={true}
            maxLength={50}
            value={task.name}
            onChangeText={(text) => changeNameTask(text, task)}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        borderBottomWidth: 0,
        textDecorationLine: "underline",
        width: "90%",
        fontWeight: "bold",
        paddingVertical: 10,
    },
});
