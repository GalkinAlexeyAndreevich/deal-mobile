import { View, TextInput, Pressable } from "react-native";
import React from "react";
import { useAppDispatch } from "@store/hook";
import { deleteTask, setStatusTask } from "@store/tasksDatesSlice";
import { CheckBox, Image } from "react-native-elements";
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
                justifyContent: "space-between",
            }}>
            <View style={{ display: "flex", flexDirection: "row",maxWidth: "79%",alignItems:"center" }}>
                <CheckBox
                    size={23}
                    checked={task.done}
                    onPress={() => dispatch(setStatusTask(task.id))}
                    checkedColor="red"
                    containerStyle={{margin:0,paddingHorizontal:0}}
                    checkedIcon={<Image source={require('@assets/galochka.jpg')} style={{ height: 30, width:30 }}/>}
                    uncheckedIcon={<Image source={require('@assets/uncheckedGalochka.jpg')} style={{height: 30, width: 30 }} />}
                />
                {/* <View> */}
                <TextInput
                    style={{
                        margin: 0,
                        padding: 0,
                        textDecorationLine: task.done ? "line-through" : "none",
                        fontSize: 20,

                        
                    }}
                    multiline={true}
                    maxLength={50}
                    value={task.name}
                    onChangeText={(text) => changeNameTask(text, task)}
                />
                {/* </View> */}
            </View>

            <Pressable
                style={{ paddingHorizontal: 3}}
                onPress={() => dispatch(deleteTask(task.id))}>
                <Icon name="close" size={25} color="red"/>
            </Pressable>
        </View>
    );
}
