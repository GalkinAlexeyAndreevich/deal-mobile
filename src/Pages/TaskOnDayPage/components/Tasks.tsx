import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { CheckBox } from "react-native-elements";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { SubTask, Task } from "@interfaces";
import { setTasks } from "@store/tasksDatesSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Subtasks from "./Subtasks";


export default function Tasks() {
    const {tasks, currentDate} = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [filtered, setFiltered] = useState<Task[]>([])

    useEffect(()=>{
        let filteredArr = []
        for(let item of tasks){
            if(item.date == currentDate){
                filteredArr.push(item)
            }
        }
        setFiltered(filteredArr)
        // let filteredArr = tasks.map(task=>)
    },[tasks,currentDate])

    const changeTask = (task: Task) => {
        let found = tasks.find((element) => element.id === task.id);
        found.done = !found.done
        if(found?.subtasks?.length){
            if(found.done){
                for(let item of found.subtasks){
                    item.done = true
                }
            }
            else{
                for(let item of found.subtasks){
                    item.done = false
                }
            }
        }
        const newState = tasks.map((el) =>
            el.id === task.id ? found: el
        );

        console.log(newState);

        dispatch(setTasks(newState));
    };

    const changeNameTask = (
        text: string,
        task: Task,
        subtask: SubTask = null
    ) => {
        console.log(text, task);
        if (!text) return;
        let found = tasks.find((element) => element.id === task.id);
        if (subtask) {
            let sub = found.subtasks.find(
                (element) => element.id === subtask.id
            );
            sub.name = text;
        } else {
            found.name = text;
        }
        console.log(
            "Change sub",
            found.subtasks.find((element) => element.id === subtask.id)
        );

        const newState = tasks.map((el) => (el.id === task.id ? found : el));
        dispatch(setTasks(newState));
    };
    return (
        <>
            {filtered.map((task) => (
                <View key={task.id}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <CheckBox
                            size={20}
                            checked={task.done}
                            // disabled={task.subtasks?.length > 0}
                            onPress={() => changeTask(task)}
                            checkedColor="red"
                        />
                        <TextInput
                            style={{
                                margin: 0,
                                padding: 0,
                                textDecorationLine: task.done
                                    ? "line-through"
                                    : "none",
                            }}
                            value={task.name}
                            // multiline={true}
                            onChangeText={(text) => changeNameTask(text, task)}
                        />
                        <View>
                            <Icon name="delete" size={15} />
                        </View>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        {task?.subtasks?.length>0 &&
                            task.subtasks.map((sub) => (
                                <Subtasks
                                    key={sub.id}
                                    sub={sub}
                                    task={task}
                                    changeNameTask={changeNameTask}
                                />
                            ))}
                    </View>
                </View>
            ))}
        </>
    );
}
