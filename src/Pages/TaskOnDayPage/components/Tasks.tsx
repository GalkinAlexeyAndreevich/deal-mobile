import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { Task } from "@interfaces";
import { setPositionTasks } from "@store/tasksDatesSlice";
import TaskItem from "./TaskItem";
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/routes/TabNavigator";
import moment from "moment";
import { setOrderTask } from "db";
import type { TaskStackParamList } from "@src/routes/TaskNavigator";
interface IProps {
    navigation: NativeStackNavigationProp<TaskStackParamList, "TaskOnDayPage">;
    currentDate: string;
}

export default function Tasks({ currentDate, navigation }: IProps) {
    const { tasks, typesTask } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [filtered, setFiltered] = useState<Task[]>([]);

    useEffect(() => {
        let filteredArr = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].date == currentDate) filteredArr.push(tasks[i]);
        }
        setFiltered(
            filteredArr.sort((a, b) => (a.priorityId > b.priorityId ? 1 : -1))
        );
    }, [tasks, currentDate]);

    const redirectToTask = (task: Task) => {
        // console.log("redirectOnNewPage", task);
        navigation.push("OneTaskPage", {
            taskId: task.id,
            uniqueId: moment().toISOString(),
            currentDate: currentDate,
        });
    };

    const renderTask = ({
        item: task,
        drag,
        isActive,
    }: RenderItemParams<Task>) => {
        return (
            <ScaleDecorator>
                <TaskItem
                    task={task}
                    drag={drag}
                    isActive={isActive}
                    redirect={redirectToTask}
                />
            </ScaleDecorator>
        );
    };
    
    const setTasksPosition = (data: Task[]) => {
        console.log("new position ", data);
        let finalTasks = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < finalTasks.length; i++) {
            finalTasks[i].priorityId = i;
        }
        setOrderTask(data);
        dispatch(
            setPositionTasks({
                newTasks: finalTasks,
                currentDate,
            })
        );
    };

    return (
        <View>
            {filtered.length === 0 ? (
                <View style={styles.wrapper}>
                    <Text style={styles.text}>
                        У вас нет целей на этот день,
                    </Text>
                    <Text style={styles.text}>но вы можете их добавить.</Text>
                </View>
            ) : (
                <DraggableFlatList
                    data={filtered}
                    onDragEnd={({ data }) => setTasksPosition(data)}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderTask}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        paddingTop: "50%",
        alignSelf: "center",
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        color: "#a7ceff",
    },
});
