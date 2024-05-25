import { TextInput, StyleSheet, View } from "react-native";
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
        if (!text.length) return;
        console.log(text, task.id);
        dispatch(setNameTask({ text, taskId: task.id, subtaskId: undefined }));
    };
    return (
        <View style={{width:"80%"}}>
            <TextInput
                underlineColorAndroid="transparent"
                // ref={inputRef}
                style={styles.input}
                // keyboardType="default"
                multiline={true}
                // returnKeyType="done"
                maxLength={50}
                value={task.name}
                blurOnSubmit={true}
                onChangeText={(text) => changeNameTask(text, task)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        borderBottomWidth: 0,
        // width: "80%",
        maxHeight: 100,
        // fontWeight: "bold",
        // paddingVertical: 10,
    },
});
