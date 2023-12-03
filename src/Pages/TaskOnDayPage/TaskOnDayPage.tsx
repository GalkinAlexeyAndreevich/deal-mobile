import { View, Text } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { Button, CheckBox } from "react-native-elements";
import { defaultTasks } from "@utils/dataNoFetch";
import { SubTasks, Tasks } from "@interfaces";
import { useAppSelector } from "@store/hook";

moment().locale("ru");


const paddingOnLevel = {
    0:10,
    1:25,
    2:40
}

export default function TaskOnDayPage() {
    const [tasks, setTasks] = useState<Tasks[]>(defaultTasks);
    const currentDate = useAppSelector(state=>state.tasksDates.currentDate)
    // const [currentDate, setCurrentDate] = useState(new Date());
    
    const changeTask = (task: Tasks) => {
        const found = tasks.find((element) => element.id === task.id);
        const newState = tasks.map((el) =>
            el.id === task.id ? { ...el, done: !el.done } : el
        );
        console.log(newState);

        setTasks(newState);
    };

    /*
    Должны быть рассчитано:
    1. Если Выполнены все подзадания 0 уровня, закрываем задания  и 
    2. Если Выполнено подзадания, закрываем подзадания высокого уровня
    3. Если Выполнены все дозадания высокого уровня закрываем уровень level-1 

    */

    const changeSub = (sub: SubTasks, task: Tasks) => {
        let found = tasks.find((element) => element.id === task.id);

       found.subtasks.map((item) => {
            if (item.id === sub.id) {
                item.done = !item.done;
                if(item.done){
                    // Находим все элементы на этом уровне
                    let test = found.subtasks.filter((element) => element.parentId === item.parentId && element.level === item.level);
                    console.log(test);
                    // Проверяем что на этом уровне все задания сделаны
                    let check = true
                    for(let item of test){
                        if(item.done ===false)check=false
                    }
                    // Если Выполнены все подзадания 0 уровня, закрываем задания
                    if(check && item.level === 0){
                        found.done = true
                    }
                    // Если нет то подзадания
                    else if(check){
                        let test1 = found.subtasks.filter((element) => element.parentId === item.parentId && element.level >1 );
                        found.done = true
                    }
                    if(item.level ===0){
                        // let found2 = foundfilter((element) => element.parentId === item.parentId && element.level !=0);
                        found.done = true
                    }
                    let found1 = found.subtasks.filter((element) => element.parentId === item.parentId && element.level !=0);
                }
            }
            
            return item;
        });
        console.log(found);
        const newState = tasks.map((el) => (el.id === found.id ? found : el));
        setTasks(newState);
    };

    return (
        <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Цели на {moment(currentDate).format("DD MMMM")}
            </Text>
            {tasks.map((task) => (
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
                            onPress={() => changeTask(task)}
                            checkedColor="red"
                        />
                        <Text
                            style={{
                                textDecorationLine: task.done
                                    ? "line-through"
                                    : "none",
                            }}>
                            {task.name}
                        </Text>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            
                            // alignItems: "center",
                        }}>
                        {task.subtasks.map((sub) => (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingLeft:paddingOnLevel[sub.level]
                                }}
                                key={sub.id}>
                                <CheckBox
                                    size={20}
                                    checked={sub.done}
                                    onPress={() => changeSub(sub, task)}
                                    checkedColor="red"
                                />
                                <Text
                                    style={{
                                        textDecorationLine: sub.done
                                            ? "line-through"
                                            : "none",
                                    }}>
                                    {sub.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
}
