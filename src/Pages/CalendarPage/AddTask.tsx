import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function AddTask() {
    return (
        <TouchableOpacity
            style={{
                alignSelf: "stretch",
                justifyContent: "flex-end",
                backgroundColor: "#3390ee",
                paddingVertical: 5,
            }}>
            <Text
                style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                }}>
                Добавить цель
            </Text>
        </TouchableOpacity>
    );
}
