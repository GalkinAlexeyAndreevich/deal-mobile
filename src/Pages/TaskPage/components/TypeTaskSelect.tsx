import { View, Text, StyleSheet } from "react-native";
import React from "react";
// import { ITypeTask } from "@src/interfaces";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import type { ITypeTask, Task } from "@src/interfaces";
import { Dropdown } from "react-native-element-dropdown";
import { setTypeTask } from "@src/store/tasksDatesSlice";

interface Props{
    task:Task
}

export default function TypeTaskSelect({task}:Props) {
	const { typesTask } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch()
    const typeItem = (item: ITypeTask) => {
        return (
            <View style={styles.item}>
                <View
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: item.color,
                        marginRight: 10,
                    }}></View>
                <Text>{item.value}</Text>
            </View>
        );
    };
    return (
        <Dropdown
            style={styles.dropdown}
            labelField="value"
            valueField="value"
            data={typesTask}
            renderItem={typeItem}
            onChange={(item) => {
                dispatch(setTypeTask({newType:item.value, taskId:task.id}))
            }}
            
            value={task.type}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        width:200,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    item: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});

