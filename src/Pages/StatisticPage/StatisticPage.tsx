import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getCompleteAndNotCompleteCountTask, getTasksCountOnType } from "db";
import { useAppSelector } from "@src/store/hook";
import BarChartComponent from "./BarChart";
import PieChartComponent from "./PieChart";
import StatisticOnDoneComponent from "./StatisticOnDone";

interface IStatisticOnDone {
    completed: number;
    notCompleted: number;
}

export default function StatisticPage() {
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [statisticOnDone, setStatisticOnDone] = useState<IStatisticOnDone>({
        completed: 0,
        notCompleted: 0,
    });
    const [countOnType, setCountOnType] = useState<
        { countOnType: number; value: string; color: string }[]
    >([]);

    useEffect(() => {
        async function getData() {
            let data =
                (await getCompleteAndNotCompleteCountTask()) as IStatisticOnDone;
            console.log("Статистика", data);
            let getCountOnType = (await getTasksCountOnType()) as {
                countOnType: number;
                value: string;
                color: string;
            }[];
            console.log("Распределение по типам", getCountOnType);
            setCountOnType(getCountOnType);
            setStatisticOnDone(data);
        }
        getData();
    }, [tasks]);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.statistic}>Ваша статистика</Text>
                <StatisticOnDoneComponent statisticOnDone={statisticOnDone} />
                <BarChartComponent />
                <PieChartComponent data={countOnType} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5,
        backgroundColor: "white",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    statistic: {
        fontWeight: "600",
        fontSize: 18,
        paddingLeft: 10,
        paddingBottom: 10,
    },
});
