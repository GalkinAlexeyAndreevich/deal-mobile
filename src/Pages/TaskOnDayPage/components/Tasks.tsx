import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { SubTask, Task } from "@interfaces";
import { setNameTask } from "@store/tasksDatesSlice";
import Subtasks from "./Subtasks";
import TaskItem from "./TaskItem";

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
        subtask: SubTask = null
    ) => {
        if (!text) return;
        dispatch(setNameTask({ text, task, subtask }));
    };

    return (
        <View>
            {filtered.length == 0 && (
                <View
                    style={{
                        height: "80%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text style={{ fontSize: 20, color: "#a7ceff" }}>
                        У вас не целей на этот день,
                    </Text>
                    <Text style={{ fontSize: 20, color: "#a7ceff" }}>
                        но вы можете их добавить.
                    </Text>
                </View>
            )}
            {filtered.map((task) => (
                <View key={task.id}>
                    <TaskItem task={task} changeNameTask={changeNameTask} />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        {task?.subtasks?.length > 0 &&
                            task.subtasks.map((subtask) => (
                                <Subtasks
                                    key={subtask.id}
                                    subtask={subtask}
                                    task={task}
                                    changeNameTask={changeNameTask}
                                />
                            ))}
                    </View>
                </View>
            ))}
        </View>
    );
}
