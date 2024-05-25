import { View, Text, Dimensions, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { useAppSelector } from "@src/store/hook";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";

type countOnDay = {
    [key: string]: number;
};

export default function BarChartComponent() {
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [tasksOnThisWeek, setTasksOnThisWeek] = useState<number[]>([]);
    const [currentWeek, setCurrentWeek] = useState(new Date());
    useEffect(() => {
        const taskCounts = {
            Пн: 0,
            Вт: 0,
            Ср: 0,
            Чт: 0,
            Пт: 0,
            Сб: 0,
            Вс: 0,
        } as countOnDay;
        filteredTasks.forEach((task) => {
            const taskDueDate = moment(task.date);
            const dayOfWeek = capitalizeFirstLetter(taskDueDate.format("ddd"));
            if (!taskCounts[dayOfWeek]) {
                taskCounts[dayOfWeek] = 0;
            }
            taskCounts[dayOfWeek]++;
        });
        console.log(taskCounts);
        setTasksOnThisWeek(Object.values(taskCounts));
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

    const getWeekString = (date: Date) => {
        const selectedWeekStart = moment(date).startOf("week").format('DD/MM');
        const selectedWeekEnd = moment(date).endOf("week").format('DD/MM');
        return `${selectedWeekStart} - ${selectedWeekEnd}`;
    };

    const goToPreviousWeek = () => {
        const newDate = new Date(
            currentWeek.setDate(currentWeek.getDate() - 7)
        );
        setCurrentWeek(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(
            currentWeek.setDate(currentWeek.getDate() + 7)
        );
        setCurrentWeek(newDate);
    };
    const chartConfig = {
        count: 10,
        verticalLabelsHeightPercentage: 10,
        backgroundGradientFrom: "#989ebc",
        backgroundGradientTo: "#989ebc",
        backgroundColor: "#bcb3d0",
        labelColor: () => `rgba(0, 0, 0, 1)`,
        decimalPlaces: 2,
        color: () => `rgba(0, 0, 0, 1)`,
        barPercentage: 0.7,
        barRadius: 10,
        fillShadowGradient: `rgba(1, 122, 205, 1)`,
        fillShadowGradientOpacity: 1,
        fillShadowGradientFromOffset: 1,
        formatYLabel: (label: string) => `${Math.floor(Number(label))}`,
        yAxisLabel: {
            margin: 5,
        },
    };
    function countUniqueValues(dataArray: number[]) {
        const uniqueValues = new Set(dataArray);
        return uniqueValues.size;
    }

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 20,
                paddingTop:10
            }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                    paddingBottom: 10,
                    position:"relative"
                }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignSelf: "flex-start",
                        width: Dimensions.get("window").width - 20,
                        justifyContent:"space-between"
                    }}>
                    <Text style={{ fontSize: 15 }}>
                        Выполненные задачи (неделя)
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <Pressable
                            style={{ padding: 5 }}
                            onPress={goToPreviousWeek}>
                            <Ionicons
                                name="caret-back-sharp"
                                size={13}
                                color={"#00adf5"}
                            />
                        </Pressable>
                        <Text>{getWeekString(currentWeek)}</Text>
                        <Pressable
                            style={{ padding: 5 }}
                            onPress={goToNextWeek}>
                            <Ionicons
                                name="caret-forward-sharp"
                                size={13}
                                color={"#00adf5"}
                            />
                        </Pressable>
                    </View>
                </View>
                <Text style={{position:"absolute", zIndex:100, top:100, left:"30%", display:countUniqueValues(tasksOnThisWeek) > 1?'none':"flex"}}>Нет данных на эту неделю</Text>
                <BarChart
                    data={{
                        labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
                        datasets: [
                            {
                                data: tasksOnThisWeek
                            },
                        ],
                    }}
                    fromZero={true}
                    chartConfig={chartConfig}
                    width={Dimensions.get("window").width - 20}
                    height={220}
                    segments={
                        countUniqueValues(tasksOnThisWeek) > 5
                            ? 5
                            : countUniqueValues(tasksOnThisWeek) > 1
                            ? (countUniqueValues(tasksOnThisWeek) == 2?2: countUniqueValues(tasksOnThisWeek) - 1)
                            : 0
                    }
                    withInnerLines={false}
                    yAxisLabel=""
                    yAxisSuffix={''}
                    showBarTops={false}
                    showValuesOnTopOfBars={true}
                    yAxisInterval={2}
                    style={{
                        paddingRight: 30,
                    }}
                />
            </View>
        </View>
    );
}
