import {
    View,
    Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@src/store/hook";
import moment from "moment";

import ChangeWeekComponent from "./ChangeWeekComponent";
import BarChartComponent from "./BarChartComponent";

type countOnDay = {
    [key: string]: number;
};

export default function BarChart() {
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [tasksOnThisWeek, setTasksOnThisWeek] = useState<{ y: number }[]>([]);
    const [currentWeek, setCurrentWeek] = useState(new Date());

    useEffect(() => {
        const taskCounts = {
            Space:-10,
            Пн: -10,
            Вт: -10,
            Ср: -10,
            Чт: -10,
            Пт: -10,
            Сб: -10,
            Вс: -10,
        } as countOnDay;
        filteredTasks.forEach((task) => {
            const taskDueDate = moment(task.date);
            const dayOfWeek = capitalizeFirstLetter(taskDueDate.format("ddd"));
            if (!taskCounts[dayOfWeek]) {
                taskCounts[dayOfWeek] = 0;
            }
            if(taskCounts[dayOfWeek] == -10) taskCounts[dayOfWeek] =  1
            else taskCounts[dayOfWeek]++;
        });
        console.log(taskCounts);

        setTasksOnThisWeek(
            Object.values(taskCounts).map((value) => ({
                y: value,
            }))
        );
    }, [currentWeek, tasks]);
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const filteredTasks = tasks.filter((task) => {
        const taskDueDate = moment(task.date);
        const selectedWeekStart = moment(currentWeek).startOf("week").toDate();
        const selectedWeekEnd = moment(currentWeek).endOf("week").toDate();

        return (
            taskDueDate.isSameOrAfter(selectedWeekStart) &&
            taskDueDate.isSameOrBefore(selectedWeekEnd) &&
            task.done == true
        );
    });
    const uniqueValues = [...new Set(tasksOnThisWeek.map(item => item.y))];
    

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10,
            }}>
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 10,
                    position: "relative",
                }}>
                <ChangeWeekComponent
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                />
                <Text
                    style={{
                        position: "absolute",
                        zIndex: 100,
                        top: 100,
                        left: "30%",
                        display: uniqueValues.length > 1 ? "none" : "flex",
                    }}>
                    Нет данных на эту неделю
                </Text>
                <View style={{ width: 370, height: 200 }}>
                    <BarChartComponent data={tasksOnThisWeek} />
                </View>
            </View>
        </View>
    );
}
