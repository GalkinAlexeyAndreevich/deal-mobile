import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { SubTask, Task } from "@interfaces";
import { setNameTask, setTasks } from "@store/tasksDatesSlice";
import Subtasks from "./Subtasks";
import TaskItem from "./TaskItem";
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";

export default function Tasks({ currentDate }: { currentDate: string }) {
    const { tasks } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [filtered, setFiltered] = useState<Task[]>([]);

    useEffect(() => {
        let filteredArr = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].date == currentDate) filteredArr.push(tasks[i]);
        }
        setFiltered(filteredArr);
    }, [tasks, currentDate]);
    const changeNameTask = (
        text: string,
        task: Task,
        subtask: SubTask = {} as SubTask
    ) => {
        if (!text) return;
        console.log(text, task.id);
        dispatch(
            setNameTask({ text, taskId: task.id, subtaskId: subtask?.id })
        );
    };

    const renderTask = ({
        item: task,
        drag,
        isActive,
    }: RenderItemParams<Task>) => {
        return (
            <ScaleDecorator>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor:"white"
                    }}>
                    <TaskItem
                        task={task}
                        changeNameTask={changeNameTask}
                        drag={drag}
                        isActive={isActive}
                    />

                    {task.subtasks.length > 0 &&
                        task.subtasks.map((subtask) => (
                            <Subtasks
                                key={subtask.id}
                                subtask={subtask}
                                task={task}
                                changeNameTask={changeNameTask}
                            />
                        ))}
                </View>
            </ScaleDecorator>
        );
    };
    const setTasksPosition = (data: Task[]) => {
        data && dispatch(setTasks(data));
    };

    return (
        <View style={{ height: "100%" }}>
            {filtered.length == 0 && (
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        paddingTop: "50%",
                        alignSelf: "center",
                    }}>
                    <Text style={{ fontSize: 20, color: "#a7ceff" }}>
                        У вас нет целей на этот день,
                    </Text>
                    <Text style={{ fontSize: 20, color: "#a7ceff" }}>
                        но вы можете их добавить.
                    </Text>
                </View>
            )}
            <DraggableFlatList
                data={filtered}
                onDragEnd={({ data }) => setTasksPosition(data)}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderTask}
            />
        </View>
    );
}
