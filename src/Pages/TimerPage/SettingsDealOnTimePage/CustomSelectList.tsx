import { View } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useAppSelector } from "@src/store/hook";
import { SelectItem, Task } from "@src/interfaces";

interface Props {
    setSelectedTask: Dispatch<SetStateAction<Task>>;
}

export default function CustomSelectList({ setSelectedTask }: Props) {
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [selectData, setSelectData] = useState<SelectItem[]>([]);
    const [filtered1, setFiltered1] = useState<Task[]>([]);

    const [selectKey, setSelectedKey] = useState<number>(-1);
    useEffect(() => {
        // const newArr = tasks.filter(
        //     (task) => new Date(task.date).getDate() === new Date().getDate()
        // );
        let onlyValue: SelectItem[] = [];
        for (let item of tasks) {
            onlyValue.push({
                value: item.name,
                key: item.id,
                label: item.id,
                disabled: false,
            });
        }
        setFiltered1(tasks);
        setSelectData(onlyValue);
    }, [tasks]);

    // useEffect(()=>{
    //     setSelectedTask(filtered1[0])
    // },[filtered1])

    const selectTask = (key: number) => {
        if (selectKey) {
            for (let i = 0; i < selectData.length; i++) {
                if (selectData[i].key == selectKey)
                    selectData[i].disabled = false;
                if (selectData[i].key == key) selectData[i].disabled = true;
            }
        }
        setSelectedKey(key);
        const findItem = filtered1.find((element) => element.id == key);
        console.log(findItem);
        
        setSelectedTask(prev=>findItem || prev);
    };
    return (
        <View
            style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                marginHorizontal: 10,
                maxHeight: 200,
            }}>
            <SelectList
                dropdownStyles={{
                    position: "absolute",
                    top: 40,
                    width: "100%",
                    zIndex: 10,
                    backgroundColor: "#d9fcff",
                    borderWidth: 0,
                }}
                setSelected={(key: number) => selectTask(key)}
                inputStyles={{color:selectKey >=0?"black":"grey"}}
                disabledTextStyles={{ fontWeight: "bold" }}
                data={selectData}
                save="key"
                searchPlaceholder="Выберите цель из списка"
                placeholder="Выберите цель из списка"
            />
        </View>
    );
}
