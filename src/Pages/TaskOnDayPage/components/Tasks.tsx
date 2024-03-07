import { View, Text } from "react-native";
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
interface IProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "TaskOnDayPage">;
    currentDate: string;
}

export default function Tasks({ currentDate, navigation }: IProps) {
    const { tasks,typesTask } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [filtered, setFiltered] = useState<Task[]>([]);

    useEffect(() => {
        let filteredArr = [];
        console.log(tasks);
        
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].date == currentDate) filteredArr.push(tasks[i]);
        }
        console.log("отсортированный массив",filteredArr.sort((a,b)=>a.priorityId > b.priorityId?1:-1));
        
        setFiltered(filteredArr.sort((a,b)=>a.priorityId > b.priorityId?1:-1));
    }, [tasks, currentDate]);

    const redirectToTask = (task: Task) => {
        console.log("redirectOnNewPage", task);
        navigation.navigate("TaskPage", {
            taskId: task.id,
            uniqueId: moment().toISOString(),
            currentDate:currentDate
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
        let finalTasks = JSON.parse(JSON.stringify(data))
        for(let i=0;i<finalTasks.length;i++){
            finalTasks[i].priorityId = i
        }
        console.log("after sort",finalTasks );
        
        setOrderTask(data)
        data && dispatch(setPositionTasks({ newTasks: finalTasks, currentDate }));
    };

    return (
        <View>
            {filtered.length ===0 ? (
                <View
                    style={{
                        display: "flex",
                        paddingTop: "50%",
                        alignSelf: "center",
                    }}>
                    <Text style={{textAlign:'center', fontSize: 20, color: "#a7ceff" }}>
                        У вас нет целей на этот день,
                    </Text>
                    <Text style={{textAlign:'center', fontSize: 20, color: "#a7ceff" }}>
                        но вы можете их добавить.
                    </Text>
                </View>
            ) : (
                <DraggableFlatList
                    data={filtered}
                    onDragEnd={({ data }) => setTasksPosition(data)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTask}
                />
            )}
        </View>
    );
}
