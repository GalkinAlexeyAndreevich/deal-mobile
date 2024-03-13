import {
    TextInput,
    Pressable,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { CheckBox } from "react-native-elements";
import { SubTask, Task } from "@interfaces";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { deleteSubtask, setSubtask } from "@src/store/tasksDatesSlice";
import { useAppDispatch } from "@src/store/hook";
import { deleteSubtaskDb } from "db";

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
    const dispatch = useAppDispatch()
    const inputRef = useRef<TextInput>(null);
    const longPress = () => {
        console.log("long press");
        drag();
    };

    const enableInput = () => {
        if (!isActiveInput) {
            inputRef.current && inputRef.current.focus();
        }
        setChanged(true);
        setIsActiveInput(true);
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
                    size={12}
                    checked={subtask.subtask_done}
                    onLongPress={longPress}
                    onPress={() =>{
                        dispatch(
                            setSubtask({
                                subtaskId: subtask.subtask_id,
                                taskId: task.id,
                            })
                        );
                    }}
                    checkedColor="black"
                    checkedIcon={<FontAwesome name="circle" size={12}/>}
                    uncheckedIcon={<FontAwesome name="circle-o" size={12}/>}
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
                        value={subtask.subtask_name}
                        onChangeText={(text) =>
                            changeNameTask(text, task, subtask)
                        }
                        blurOnSubmit={true}
                        placeholder="Введите подцель"
                    />
                ) : (
                    <Text
                        style={{
                            fontSize: 20,
                            width:'75%',
                            opacity:subtask.subtask_name.length?1:0.3
                        }}>
                        {subtask.subtask_name.length?subtask.subtask_name:'Введите подцель'}
                    </Text>
                )}
            </View>

            <Pressable
                style={{ padding: 3,marginRight:10 }}
                onLongPress={longPress}
                onPress={() =>{
                    dispatch(
                        deleteSubtask({
                            taskId: task.id,
                            subtaskId: subtask.subtask_id,
                        })
                    );
                    deleteSubtaskDb(subtask.subtask_id)
                }}>
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
        paddingLeft: 0,
        justifyContent:'space-between'
    },
    secondContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        width: "75%",
    },
});
