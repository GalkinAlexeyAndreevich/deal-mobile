import { View, Text } from "react-native";
import React from "react";
import { CheckBox } from "react-native-elements";

export default function FirstLevel({ task, changeTask }) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}>
            <CheckBox
                size={20}
                checked={task.done}
                onPress={() => changeTask(task)}
                checkedColor="red"
            />
            <Text
                style={{
                    textDecorationLine: task.done ? "line-through" : "none",
                }}>
                {task.name}
            </Text>
        </View>
    );
}
