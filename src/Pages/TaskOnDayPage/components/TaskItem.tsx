import {
    View,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import React from "react";
import { useAppDispatch } from "@store/hook";
import { deleteTask, setStatusTask } from "@store/tasksDatesSlice";
import { CheckBox, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Task } from "@interfaces";
import { deleteTaskDb } from "db";
import AlertAsync from "react-native-alert-async";

interface Props {
    task: Task;
    drag: () => void;
    isActive: boolean;
    redirect:(task:Task)=>void
}

export default function TaskItem({ task, drag, isActive,redirect }: Props) {
    const dispatch = useAppDispatch();
    const longPress = () => {
        console.log("long press");
        drag();
    };

    const deleteTaskHandler = async()=>{
        const confirmDelete = await AlertAsync(
            "Подтвердить действие",
            "Вы действительно хотити удалить задачу?",
            [
                {
                    text: "Отменить",
                    onPress: () => false,
                    style: "cancel",
                },
                { text: "Удалить", onPress: () => true },
            ],
            { cancelable: false }
        );
        if(confirmDelete){
            dispatch(deleteTask(task.id))
            deleteTaskDb(task.id)
        }
    }
    

    return (
        <TouchableOpacity
            onPress={()=>redirect(task)}
            onLongPress={longPress}
            disabled={isActive}
            style={{
                ...styles.mainContainer,
                opacity: isActive ? 0.7 : 1,
            }}>
            <View style={styles.secondContainer}>
                <CheckBox
                    size={23}
                    checked={task.done}
                    onPress={() => {
                        dispatch(setStatusTask(task.id))
                    }}
                    checkedColor="red"
                    onLongPress={longPress}
                    containerStyle={{ margin: 0, paddingHorizontal: 0 }}
                    checkedIcon={
                        <Image
                            source={require("@assets/galochka.jpg")}
                            style={{ height: 30, width: 30 }}
                        />
                    }
                    uncheckedIcon={
                        <Image
                            source={require("@assets/uncheckedGalochka.jpg")}
                            style={{ height: 30, width: 30 }}
                        />
                    }
                />

                <Text
                    style={{
                        fontSize: 20,
                        width: "77%",
                        textDecorationLine: task.done ? "line-through" : "none",
                    }}>
                    {task.name}
                </Text>
            </View>
            <Pressable
                style={{ paddingHorizontal: 3 }}
                onLongPress={longPress}
                onPress={deleteTaskHandler}>
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
        justifyContent: "space-between",
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
        borderBottomWidth: 0,
        textDecorationLine: "underline",
        width: "77%",
    },
});
