import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { Button, CheckBox } from "react-native-elements";
import { defaultTasks } from "@utils/dataNoFetch";
import { SubTasks, Tasks } from "@interfaces";
import { useAppSelector } from "@store/hook";
import { Input } from "@rneui/base";

moment().locale("ru");

const paddingOnLevel = {
    0: 15,
    1: 30,
    2: 45,
};

export default function TaskOnDayPage() {
    const [tasks, setTasks] = useState<Tasks[]>(defaultTasks);
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    // const [currentDate, setCurrentDate] = useState(new Date());

    const changeTask = (task: Tasks) => {
        const found = tasks.find((element) => element.id === task.id);
        const newState = tasks.map((el) =>
            el.id === task.id ? { ...el, done: !el.done } : el
        );
        console.log(newState);
        found.subtasks.map((sub)=>sub.done = !task.done)
        // found.subtasks.filter((element) => element.parentId === found.parentId && element.level === item.level);
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
                if (item.done) {
                    // Находим все элементы на этом уровне
                    let test = found.subtasks.filter(
                        (element) =>
                            element.subParentId === item.subParentId &&
                            element.level === item.level
                    );
                    console.log(test);
                    // Проверяем что на этом уровне все задания сделаны
                    let check = true;
                    for (let item of test) {
                        if (item.done === false) check = false;
                    }
                    console.log(item);
                    
                    // Если Выполнены все подзадания 0 уровня, закрываем задания
                    if (check && item.level === 0) {
                        console.log("task on level 0 close");
                        
                        found.done = true;
                    }
                    // Если нет то подзадания
                    else if (check) {
                        let test1 = found.subtasks.find(
                            (element) =>
                                element.id === item.subParentId &&
                                element.level === item.level - 1
                        );
                        console.log("Подзадание:", test1);
                        
                        test1.done = true;
                    }
                    // if (item.level === 0) {
                    //     // let found2 = foundfilter((element) => element.parentId === item.parentId && element.level !=0);
                    //     found.done = true;
                    // }
                    let found1 = found.subtasks.filter(
                        (element) =>
                            element.subParentId === item.subParentId &&
                            element.level != 0
                    );
                }
            }

            return item;
        });
        console.log(found);
        const newState = tasks.map((el) => (el.id === found.id ? found : el));
        setTasks(newState);
    };

    const changeNameTask = (text: string, task: Tasks | SubTasks) => {
        // if(!text)return
        console.log(text);

        let found = {} as Tasks;
        let subtask = {} as SubTasks;
        if ("mainParentId" in task) {
            console.log("Subtask");
            
            found = tasks.find((element) => element.id === task.mainParentId);
            subtask = found?.subtasks?.find(
                (element) => element.id === task.id
            );
            subtask.name = text;
        } else {
            console.log("task");
            
            found = tasks.find((element) => element.id === task.id);
            found.name = text;
        }
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
                        <View style={{ width: 260 }}>
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
                                onChangeText={(text) =>
                                    changeNameTask(text, task)
                                }
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        {task.subtasks.map((sub) => (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingLeft: paddingOnLevel[sub.level],
                                }}
                                key={sub.id}>
                                <CheckBox
                                    size={20}
                                    checked={sub.done}
                                    onPress={() => changeSub(sub, task)}
                                    checkedColor="red"
                                />

                                <TextInput
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        textDecorationLine: sub.done
                                            ? "line-through"
                                            : "none",
                                    }}
                                    value={sub.name}
                                    // multiline={true}
                                    onChangeText={(text) =>
                                        changeNameTask(text, sub)
                                    }
                                />
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
}
