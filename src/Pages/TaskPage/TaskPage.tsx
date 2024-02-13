import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/routes/TabNavigator";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import TypeTaskSelect from "./components/TypeTaskSelect";
import TaskInput from "./components/TaskInput";
import SubtaskBlock from "./components/SubtaskBlock";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteTask } from "@src/store/tasksDatesSlice";

type Props = NativeStackScreenProps<RootStackParamList, "TaskPage">;

export default function TaskPage({ navigation, route }: Props) {
    const { taskId, uniqueId } = route.params;
    const { tasks } = useAppSelector((state) => state.tasksDates);
    const [changed, setChanged] = useState(false);
    const task = tasks.find((element) => element.id == taskId);
    const dispatch = useAppDispatch()
    const deleteTaskHandler = ()=>{
        navigation.navigate("TaskOnDayPage",{dateNow:undefined})
        dispatch(deleteTask(taskId))
    }

    if (!task) {
        return (
            <View style={{flex:1, backgroundColor:"white"}}>
                <Text>Произошла ошибка</Text>
            </View>
        );
    }

    return (
        <View
            // onPress={() => setChanged(false)}
            style={styles.container}>
            <View
                style={{
                    paddingBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <TypeTaskSelect task={task} />
                <Pressable style={styles.deleteTask} onPress={deleteTaskHandler}>
                    <MaterialCommunityIcons
                        name="delete"
                        color="red"
                        size={20}
                    />
                    <Text>Удалить</Text>
                </Pressable>
            </View>

            <View>
                <TaskInput task={task} />
                <SubtaskBlock
                    task={task}
                    changed={changed}
                    setChanged={setChanged}
                    uniqueId={uniqueId}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 10,
        paddingTop: 5,
    },
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
    dropdown: {
        height: 40,
        width: 200,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    item: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    deleteTask: {
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});
