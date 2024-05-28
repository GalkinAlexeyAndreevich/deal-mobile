import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

interface IStatisticOnDone {
    statisticOnDone:{
        completed: number;
        notCompleted: number;
    }
}

export default function StatisticOnDoneComponent({
    statisticOnDone,
}: IStatisticOnDone) {
    return (
        <View
            style={styles.container}>
            <View
                style={{
                    ...styles.column,
                    padding: 10,
                    width: (Dimensions.get("window").width - 20) / 2 - ((Dimensions.get("window").width - 20) / 100 * 2.5),
                    height: 100,
                    marginRight: "5%",
                    backgroundColor: "#ffffff",
                }}>
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                    {String(statisticOnDone.completed)}
                </Text>
                <Text>Выполненные</Text>
                <Text>задачи</Text>
            </View>
            <View
                style={{
                    ...styles.column,
                    padding: 10,
                    height: 100,
                    backgroundColor: "#ffffff",
                    width: (Dimensions.get("window").width - 20) / 2 - ((Dimensions.get("window").width - 20) / 100 * 2.5),
                }}>
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                    {String(statisticOnDone.notCompleted)}
                </Text>
                <Text>Незавершенные</Text>
                <Text>задачи</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingLeft:20,
        width:Dimensions.get("window").width - 20
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
});
