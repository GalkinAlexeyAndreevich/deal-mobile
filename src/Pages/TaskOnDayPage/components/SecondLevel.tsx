import { View, Text } from "react-native";
import React from "react";
import { CheckBox } from "react-native-elements";

export default function SecondLevel({ task, changeTask1 }) {
    return (
        <View>
            <CheckBox
                size={20}
                checked={task.done}
                onPress={() => changeTask1(task)}
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
