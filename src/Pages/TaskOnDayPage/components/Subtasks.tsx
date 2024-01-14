import { TextInput, Pressable } from "react-native";
import React from "react";
import { useAppDispatch } from "@store/hook";
import { setSubtask } from "@store/tasksDatesSlice";
import { CheckBox } from "react-native-elements";
import { SubTask, Task } from "@interfaces";

interface Props {
    task: Task;
    subtask: SubTask;
    changeNameTask: (text: string, task: Task, subtask?: SubTask) => void;
    drag: () => void;
    isActive: boolean;
}

export default function Subtasks({ subtask, task, changeNameTask,drag, isActive }: Props) {
    const dispatch = useAppDispatch();
    const longPress = ()=>{
        console.log("long press subtask");
        
        drag()
    }
    return (
        <Pressable
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                opacity:isActive?0.7:1,
            }}
            onLongPress={longPress}
            > 
            <CheckBox
                size={20}
                checked={subtask.done}
                onPress={() =>
                    dispatch(
                        setSubtask({ subtaskId: subtask.id, taskId: task.id })
                    )
                }
                checkedColor="red"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
            />
            <TextInput
                style={{
                    margin: 0,
                    padding: 0,
                    textDecorationLine: subtask.done ? "line-through" : "none",
                }}
                pointerEvents="none"
                value={subtask.name}
                onChangeText={(text) => changeNameTask(text, task, subtask)}
            />
        </Pressable>
    );
}
