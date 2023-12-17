import { View, Text, TextInput } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { SubTask, Task } from "@interfaces";
import { setTasks } from "@store/tasksDatesSlice";
import { CheckBox } from "react-native-elements";

export default function Subtasks({ sub, task, changeNameTask }) {
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const dispatch = useAppDispatch();
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
        dispatch(setTasks(newState));
    };
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
                checked={sub.done}
                onPress={() => changeSub(sub, task)}
                checkedColor="red"
                checkedIcon='dot-circle-o' 
                uncheckedIcon='circle-o' 
            />
            <TextInput
                style={{
                    margin: 0,
                    padding: 0,
                    textDecorationLine: sub.done ? "line-through" : "none",
                }}
                value={sub.name}
                onChangeText={(text) => changeNameTask(text, task, sub)}
            />
        </View>
    );
}
