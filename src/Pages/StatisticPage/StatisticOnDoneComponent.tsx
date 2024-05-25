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
    console.log(statisticOnDone);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "center",
                paddingLeft:20,
                width:Dimensions.get("window").width - 20
            }}>
            <View
                style={{
                    ...styles.column,
                    padding: 10,
                    width: (Dimensions.get("window").width - 20) / 2 - ((Dimensions.get("window").width - 20) / 100 * 2.5),
                    height: 100,
                    marginRight: "5%",
                    backgroundColor: "#989ebc",
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
                    // width: "45%",
                    height: 100,
                    backgroundColor: "#989ebc",
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
});
