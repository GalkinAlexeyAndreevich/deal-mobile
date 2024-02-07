import {
    View,
    Pressable,
    TextInput,
    Modal,
    StyleSheet,
    TouchableHighlight,
    Text,
    FlatList,
    Image,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Fontisto from "react-native-vector-icons/Fontisto";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ITypeTask, SubTask, Task } from "@interfaces";
import { setTasks } from "@store/tasksDatesSlice";
import moment from "moment";
import ModalTypeTask from "@components/ModalTypeTask";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AddTask({ currentDate }: { currentDate: string }) {
    const {
        tasks,
        subtasks: allSubtasks,
        typesTask,
    } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [chosenType, setChosenType] = useState<ITypeTask>({} as ITypeTask);
    //отдельно есть массив подзадач которые уже создали и подзадачи которые появляются при добавлении на кнопку
    // Изменять можно все новые позадания на этот объект вешать обработчик
    const [subtasks, setSubtasks] = useState<SubTask[]>([]);
    const addSubtask = () => {
        if (subtasks.length > 10) return;
        setSubtasks((prev) => [
            ...prev,
            {
                id: subtasks.length + 1,
                name: "",
                done: false,
            },
        ]);
    };
    const deleteSubtask = (subtask: SubTask) => {
        const newArr = subtasks.filter((item) => item.id != subtask.id);
        setSubtasks(newArr);
    };

    const changeNameSubtask = (item: SubTask, name: string) => {
        setSubtasks(
            subtasks.map((subtask) =>
                subtask.id === item.id && subtask.name == item.name
                    ? { ...subtask, name }
                    : subtask
            )
        );
    };

    const saveChange = () => {
        if (inputValue.length < 1) return;
        setOpenModal(false);
        let finalArrSubtask: SubTask[] = [];
        let typeTask =
            Object.keys(chosenType).length > 0
                ? chosenType.value
                : typesTask[0].value.length > 0
                ? typesTask[0].value
                : "Без категории";
        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[i].name.length) continue;
            finalArrSubtask.push({
                id: allSubtasks.length + subtasks[i].id,
                name: subtasks[i].name,
                done: false,
            });
        }

        const object: Task = {
            id: tasks.length + 1,
            name: inputValue,
            done: false,
            date: moment(currentDate).format("YYYY-MM-DD"),
            type: typeTask,
            subtasks: finalArrSubtask,
        };
        setInputValue("");
        setChosenType({} as ITypeTask);

        dispatch(setTasks([...tasks, object]));
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
                    value={item.name}
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
                                paddingRight: 10,
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
                                    width: 200,
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
        marginHorizontal: 10,
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
