import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { PieChart } from "react-native-chart-kit";

export default function PieChartComponent({
    data,
}: {
    data: { countOnType: number; value: string; color: string }[];
}) {
    const chartConfig = {
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
    };
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";

        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const pieData = data.map((item) => ({
        name: item.value,
        percentage: item.countOnType,
        color: item.color,
        // color:getRandomColor(),
        svg: {
            fill: () => `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        },
    }));
    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // paddingLeft: 20,
            }}>
            <Text
                style={{
                    paddingVertical: 10,
                    fontSize: 15,
                    alignSelf: "flex-start",
                    paddingLeft: 10,
                }}>
                Распределение задач по категориям
            </Text>
            <PieChart
                data={pieData}
                width={Dimensions.get("window").width - 20}
                height={220}
                chartConfig={chartConfig}
                accessor="percentage"
                backgroundColor="#989ebc"
                paddingLeft="15"
                absolute
            />
        </View>
    );
}
