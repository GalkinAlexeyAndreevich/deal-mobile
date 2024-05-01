import { View } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useAppSelector } from "@src/store/hook";
import { SelectItem, Task } from "@src/interfaces";
import moment from "moment";

interface Props {
    setSelectedTask: Dispatch<SetStateAction<Task>>;
}

export default function CustomSelectList({ setSelectedTask }: Props) {
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [selectData, setSelectData] = useState<SelectItem[]>([]);
    const [filtered1, setFiltered1] = useState<Task[]>([]);

    const [selectKey, setSelectedKey] = useState<string>('-1');
    useEffect(() => {
        let newArr = tasks.filter(
            (task) => moment(task.date).format('LL')=== moment().format('LL')
        );
        // console.log(newArr[0].date,moment(newArr[0].date).format('LL'),  moment().format('LL'));
        
        console.log("фильтр даты ",newArr);
        
        let onlyValue: SelectItem[] = [];
        for (let item of newArr) {
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

    const selectTask = (key: string) => {
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
                setSelected={(key: string) => selectTask(key)}
                inputStyles={{color:selectKey =='-1'?"black":"grey"}}
                disabledTextStyles={{ fontWeight: "bold" }}
                data={selectData}
                save="key"
                searchPlaceholder="Выберите цель из списка"
                placeholder="Выберите цель из списка"
            />
        </View>
    );
}
