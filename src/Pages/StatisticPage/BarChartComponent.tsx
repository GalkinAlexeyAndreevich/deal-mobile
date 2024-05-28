import { StyleSheet, Text, View, processColor } from "react-native";

import { BarChart, type BarValue } from "react-native-charts-wrapper";

function BarChartComponent({ data }: { data: { y: number }[] }) {
    // let testData = [{"y":-1}, {"y":-1}, {"y": 6}, {"y": 10}, {"y":-1}, {"y":-1} , {"y":-1}] as Array<BarValue>
    const yAxis = {
        left: {
            granularityEnabled: true,
            granularity: 1,
            textSize: 15,
            drawLabels: true,
            drawGridLines: false,
            axisMinimum: 0,
            // axisMaximum6+:max + Math.round(max / (uniqueValues.length > 5?4:uniqueValues.length)),
            valueFormatter: "largeValue",
            zeroLine: {enabled: true},
        },
        right: {
            enabled: false,
        },
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <BarChart
                    key={String(new Date())}
                    style={{
                        flex: 1
                    }}
                    data={{
                        dataSets: [
                            {
                                values: data,
                                label: "",
                                config: {
                                    color: processColor("#rgba(1, 122, 205, 1)"),
                                    valueFormatter: "#",
                                    valueTextSize: 12,
                                    drawValues:true
                                },
                            },
                        ],
                        config: {
                            barWidth: 0.5,
                        },
                    }}
                    xAxis={{
                        valueFormatter: [
                            "",
                            "Пн",
                            "Вт",
                            "Ср",
                            "Чт",
                            "Пт",
                            "Сб",
                            "Вс",
                        ],
                        drawLabels: true,
                        granularityEnabled: true,
                        granularity: 1,
                        position: "BOTTOM",
                        textSize: 15,
                        drawGridLines: false,
                        axisMinimum: 0,
                    }}
                    yAxis={yAxis}
                    animation={{ durationX: 500 }}
                    legend={{
                        enabled: false,
                    }}
                    gridBackgroundColor={processColor("#ffffff")}
                    drawBarShadow={false}
                    chartDescription={{ text: "" }}
                    drawValueAboveBar={true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1,
    },
});

export default BarChartComponent;
