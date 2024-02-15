import { View, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/routes/TabNavigator";
import { useAppSelector } from "@src/store/hook";
import TypeTaskSelect from "./components/TypeTaskSelect";
import TaskInput from "./components/TaskInput";
import SubtaskBlock from "./components/SubtaskBlock";
import Icon from "react-native-vector-icons/Feather";

type Props = NativeStackScreenProps<RootStackParamList, "TaskPage">;

export default function TaskPage({ navigation, route }: Props) {
    const { taskId, uniqueId } = route.params;
    const { tasks } = useAppSelector((state) => state.tasksDates);
    const [changed, setChanged] = useState(false);
    const [openSubtask, setOpenSubtask] = useState(true);
    const task = tasks.find((element) => element.id == taskId);

    if (!task) {
        return <View style={{ flex: 1, backgroundColor: "white" }}></View>;
    }

    return (
        <View
            // onPress={() => setChanged(false)}
            style={styles.container}>
            <View
                style={
                    {
                        // paddingBottom: 2,
                    }
                }>
                <TypeTaskSelect task={task} />
            </View>
            <View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <TaskInput task={task} />
                    <Pressable
                        style={{ padding: 3, marginRight: 5 }}
                        onPress={() => setOpenSubtask((prev) => !prev)}>
                        {openSubtask ? (
                            <Icon name="arrow-up-circle" size={25} />
                        ) : (
                            <Icon name="arrow-down-circle" size={25} />
                        )}
                    </Pressable>
                </View>
                <View style={{ display: openSubtask ? "flex" : "none" }}>
                    <SubtaskBlock
                        task={task}
                        changed={changed}
                        setChanged={setChanged}
                        uniqueId={uniqueId}
                    />
                </View>
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
});
