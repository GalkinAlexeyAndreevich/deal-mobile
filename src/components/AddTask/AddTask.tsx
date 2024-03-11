import {
    View,
    Pressable,
    TextInput,
    Modal,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Fontisto from "react-native-vector-icons/Fontisto";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ITypeTask, SubTask, Task } from "@interfaces";
import { setTasks } from "@store/tasksDatesSlice";
import moment from "moment";
import ModalTypeTask from "@components/ModalTypeTask";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addTask } from "db";

export default function AddTask({ currentDate }: { currentDate: string }) {
    const {
        tasks,
        typesTask,
    } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [chosenType, setChosenType] = useState<ITypeTask>(typesTask[0]);
    //отдельно есть массив подзадач которые уже создали и подзадачи которые появляются при добавлении на кнопку
    // Изменять можно все новые позадания на этот объект вешать обработчик
    const [subtasks, setSubtasks] = useState<SubTask[]>([]);
    const [locked, setLocked] = useState(false);
    const addSubtask = () => {
        if (subtasks.length > 10) return;
        setSubtasks((prev) => [
            ...prev,
            {
                subtask_id: new Date().getTime(),
                subtask_name: "",
                subtask_done: false,
                subtask_priorityId: 0,
            },
        ]);
    };
    const deleteSubtask = (subtask: SubTask) => {
        const newArr = subtasks.filter(
            (item) => item.subtask_id != subtask.subtask_id
        );
        setSubtasks(newArr);
    };

    const changeNameSubtask = (item: SubTask, name: string) => {
        console.log(item, name);

        setSubtasks(
            subtasks.map((subtask) =>
                subtask.subtask_id === item.subtask_id
                    ? { ...subtask, subtask_name: name }
                    : subtask
            )
        );
    };

    const saveChange = async () => {
        if (inputValue.length < 1) return;
        if (!locked) {
            setOpenModal(false);
        }
        let finalArrSubtask: SubTask[] = [];
        let typeTask =
            Object.keys(chosenType).length > 0
                ? chosenType.key
                : typesTask[0].key > 0
                ? typesTask[0].key
                : 1;
        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[i].subtask_name.length) continue;
            finalArrSubtask.push({
                subtask_id: subtasks[i].subtask_id,
                subtask_name: subtasks[i].subtask_name,
                subtask_done: false,
                subtask_priorityId: i,
            });
        }
        const tasksOnDate =  tasks.filter(element=>element.date == moment(currentDate).format("YYYY-MM-DD"))
        let priorityId = 0
        if(tasksOnDate.length){
            for(let i=0;i<tasksOnDate.length;i++){
                priorityId = Math.max(priorityId, tasksOnDate[i].priorityId)
            }
            priorityId+=1
        }
        const object: Task = {
            id: new Date().getTime(),
            name: inputValue,
            done: false,
            date: moment(currentDate).format("YYYY-MM-DD"),
            typeId: typeTask,
            subtasks: finalArrSubtask,
            priorityId: priorityId,
        };
        setInputValue("");
        setChosenType(typesTask[0]);
        addTask(object);
        dispatch(setTasks([...tasks,object]));
    };

    const SubtaskItem = ({ item }: { item: SubTask }) => {
        return (
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginVertical: 4,
                    paddingVertical: 5,
                    paddingLeft: 7,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <TextInput
                    style={{}}
                    placeholderTextColor="#98989a"
                    placeholder="Введите подцель"
                    value={item.subtask_name}
                    onChangeText={(text) => changeNameSubtask(item, text)}
                />
                <Pressable
                    style={{ paddingHorizontal: 3 }}
                    onPress={() => deleteSubtask(item)}>
                    <Icon name="close" size={20} color="red" />
                </Pressable>
            </View>
        );
    };

    return (
        <>
            <Pressable
                onPress={() => {
                    console.log("open modal");
                    setOpenModal(true);
                    setSubtasks([]);
                    setChosenType(typesTask[0]);
                }}
                style={{
                    flex: 1,
                    zIndex: 2,
                    padding: 15,
                    borderRadius: 100,
                    backgroundColor: "#d9fcff",
                }}>
                <Fontisto name="plus-a" color={"black"} size={30} />
            </Pressable>

            <Modal
                transparent={true}
                animationType={"slide"}
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}>
                <TouchableHighlight
                    style={styles.background}
                    onPress={() => setOpenModal(false)}
                    underlayColor={"transparent"}>
                    <View />
                </TouchableHighlight>
                <View style={styles.outerContainer}>
                    <View style={styles.container}>
                        <View
                            style={{
                                width: "100%",
                                marginVertical: 7,
                                paddingLeft: 7,
                                display: "flex",
                                flexDirection: "column",
                            }}>
                            <TextInput
                                style={styles.textInputTask}
                                maxLength={50}
                                // placeholderTextColor="#98989a"
                                placeholder="Введите цель"
                                value={inputValue}
                                onChangeText={(text) => setInputValue(text)}
                            />

                            <FlatList
                                style={{ maxHeight: 150, marginHorizontal: 10 }}
                                data={subtasks}
                                renderItem={SubtaskItem}
                                keyExtractor={(_, index) => String(index)}
                            />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                // paddingHorizontal: 10,
                                paddingRight: 0,
                            }}>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                <ModalTypeTask
                                    selectedType={chosenType}
                                    setSelectedType={setChosenType}
                                />
                                <Pressable
                                    style={{
                                        paddingLeft: 7,
                                    }}
                                    onPress={addSubtask}>
                                    <Image
                                        source={require("@assets/subtaskIcon.png")}
                                        style={{ width: 25, height: 28 }}
                                    />
                                    {/* <Text>Создать подзадачу</Text> */}
                                </Pressable>
                                <Pressable
                                    onPress={() => setLocked((prev) => !prev)}
                                    style={{
                                        paddingLeft: 5,
                                        paddingTop:5
                                    }}>
                                    {locked ? (
                                        <Fontisto name="locked" size={20} />
                                    ) : (
                                        <Fontisto name="unlocked" size={20} />
                                    )}
                                </Pressable>
                            </View>
                            <Button
                                title="Создать цель"
                                buttonStyle={{
                                    borderColor:
                                        inputValue.length < 1
                                            ? "black"
                                            : "#ff0000",
                                    borderWidth: 2,
                                }}
                                type="outline"
                                titleStyle={{
                                    color:
                                        inputValue.length < 1
                                            ? "black"
                                            : "#ff0000",
                                    fontSize: 20,
                                }}
                                containerStyle={{
                                    width: 180,
                                }}
                                onPress={saveChange}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: "white",
        display: "flex",
    },
    background: {
        flex: 1,
        backgroundColor: "black",
        opacity: 0.5,
        zIndex: 1,
    },
    outerContainer: {
        zIndex: 2,
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        bottom: 0,
    },
    textInputTask: {
        margin: 0,
        // marginHorizontal: 10,
        padding: 0,
        borderWidth: 1,
        borderRadius: 10,
        // borderColor: "white",
        backgroundColor: "white",
        color: "#98989a",
        height: 65,
        paddingLeft: 7,
        fontSize: 20,
        fontWeight: "600",
    },
});
