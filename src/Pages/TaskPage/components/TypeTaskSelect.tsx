import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import type { ITypeTask, Task } from "@src/interfaces";
import { Dropdown } from "react-native-element-dropdown";
import { setTypeTask } from "@src/store/tasksDatesSlice";

interface Props{
    task:Task
}

export default function TypeTaskSelect({task}:Props) {
	const { typesTask } = useAppSelector((state) => state.tasksDates);
    const type = typesTask.find(element=>element.key == task.typeId)
    const dispatch = useAppDispatch()
    const optimizationWidth = ()=>{
        if(!type?.value?.length || type?.value?.length <6)return 90
        if(type?.value?.length < 10){
            return type?.value?.length * 19
        }
        return type?.value?.length * 13
    }   
    const typeItem = (item: ITypeTask) => {
        return (
            <View style={{...styles.item}}>
                <View
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: item.color,
                        marginRight: 10,
                    }}></View>
                    <Text>
                        <Text>{item.value}</Text>
                    </Text>
            </View>
        );
    };
    return (
        <Dropdown
            style={{...styles.dropdown,backgroundColor:type?.color, width:optimizationWidth()}}
            labelField="value"
            valueField="value"
            data={typesTask}
            containerStyle={{width:200}}
            renderItem={typeItem}
            onChange={(item) => {
                dispatch(setTypeTask({newTypeId:item.key, taskId:task.id}))
            }}
            value={type?.value}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: {
        display:"flex",
        paddingHorizontal: 10,
        justifyContent:"flex-end",
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

