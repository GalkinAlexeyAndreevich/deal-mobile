import {
    TextInput,
    Pressable,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useAppDispatch } from "@store/hook";
import { deleteSubtask, setSubtask } from "@store/tasksDatesSlice";
import { CheckBox } from "react-native-elements";
import { SubTask, Task } from "@interfaces";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    task: Task;
    subtask: SubTask;
    changeNameTask: (text: string, task: Task, subtask?: SubTask) => void;
    drag: () => void;
    isActive: boolean;
    changed: boolean;
    setChanged: Dispatch<SetStateAction<boolean>>;
}

export default function Subtasks({
    subtask,
    task,
    changeNameTask,
    drag,
    isActive,
    changed,
    setChanged,
}: Props) {
    const dispatch = useAppDispatch();
    const inputRef = useRef<TextInput>(null);
    const longPress = () => {
        console.log("long press");
        drag();
    };
    const enableInput = () => {
        console.log("enable");
        if (!isActiveInput) {
            inputRef.current && inputRef.current.focus();
        }
        setChanged(true);
        setIsActiveInput(true);
    };
    const blurInput = () => {
        console.log("unfocus");
        setIsActiveInput(false);
        inputRef.current && inputRef.current.blur();
    };
    const [isActiveInput, setIsActiveInput] = useState(false);
    return (
        <TouchableOpacity
            style={{
                ...styles.mainContainer,
                opacity: isActive ? 0.7 : 1,
            }}
            disabled={isActive}
            onLongPress={longPress}
            onPress={enableInput}>
            <View style={styles.secondContainer}>
                <CheckBox
                    size={20}
                    checked={subtask.done}
                    onLongPress={longPress}
                    onPress={() =>
                        dispatch(
                            setSubtask({
                                subtaskId: subtask.id,
                                taskId: task.id,
                            })
                        )
                    }
                    checkedColor="red"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                />

                {isActiveInput && changed ? (
                    <TextInput
                        ref={inputRef}
                        style={{
                            ...styles.input,
                            textDecorationLine: task.done
                                ? "line-through"
                                : "none",
                        }}
                        autoFocus={isActiveInput}
                        multiline={true}
                        maxLength={50}
                        value={subtask.name}
                        onChangeText={(text) =>
                            changeNameTask(text, task, subtask)
                        }
                        onEndEditing={blurInput}
                    />
                ) : (
                    <Text
                        style={{
                            fontSize: 20,
                        }}>
                        {subtask.name}
                    </Text>
                )}
            </View>

            <Pressable
                style={{ paddingHorizontal: 3 }}
                onLongPress={longPress}
                onPress={() =>
                    dispatch(
                        deleteSubtask({
                            taskId: task.id,
                            subtaskId: subtask.id,
                        })
                    )
                }>
                <Icon name="close" size={25} color="red" />
            </Pressable>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
    },
    secondContainer: {
        display: "flex",
        flexDirection: "row",
        width: "91.3%",
        alignItems: "center",
    },
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        // width: "80%",
    },
});
