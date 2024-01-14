import {
    View,
    Pressable,
    TextInput,
    Modal,
    StyleSheet,
    TouchableHighlight,
    Text,
    FlatList,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ITypeTask, SubTask, Task } from "@interfaces";
import { setTasks } from "@store/tasksDatesSlice";
import moment from "moment";
import ModalTypeTask from "@components/ModalTypeTask";
import { Button } from "react-native-elements";

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
        setSubtasks((prev) => [
            ...prev,
            {
                id: subtasks.length + 1,
                name: "",
                done: false,
            },
        ]);
    };

    const changeNameSubtask = (item: SubTask, name: string) => {
        setSubtasks((prev) => [
            ...prev,
            {
                id: item.id,
                name: name,
                done: item.done,
            },
        ]);
    };

    const saveChange = () => {
        if(inputValue.length <1)return
        setOpenModal(false);
        let finalArrSubtask: SubTask[] = [];
        let typeTask =
            Object.keys(chosenType).length > 0
                ? chosenType.value
                : typesTask[0].value;
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
                    width: 370,
                    height: 15,
                    marginVertical: 7,
                    paddingLeft: 7,
                }}>
                <TextInput
                    style={{}}
                    placeholderTextColor="#98989a"
                    placeholder="Введите подцель"
                    value={item.name}
                    onChangeText={(text) => changeNameSubtask(item, text)}
                />
            </View>
        );
    };

    return (
        <>
            <Pressable
                onPress={() => {
                    console.log("open modal");
                    setOpenModal(true);
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
                    style={[styles.background]}
                    onPress={() => setOpenModal(false)}
                    underlayColor={"transparent"}>
                    <View />
                </TouchableHighlight>
                <View
                    style={{
                        ...styles.outerContainer,
                        height:
                            150 + subtasks.length * 15 > 300
                                ? 300
                                : 150 + subtasks.length * 15,
                    }}>
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
                            {/* <FlatList
                                style={{ height: 150 }}
                                data={subtasks}
                                renderItem={SubtaskItem}
                                keyExtractor={(_, index) => String(index)}
                            /> */}
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // paddingHorizontal: 10,
                            }}>
                            <View>
                                <View>
                                    <ModalTypeTask
                                        selectedType={chosenType}
                                        setSelectedType={setChosenType}
                                    />
                                </View>
                                {/* <Pressable onPress={addSubtask}>
                                    <Text>Создать подзадачу</Text>
                                </Pressable> */}
                            </View>

                            <View
                                style={{
                                    // flex: 1,
                                    display: "flex",
                                    paddingHorizontal: 10,
                                    // justifyContent: "flex-end",
                                    // alignItems: "center",
                                }}>
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
        alignItems: "stretch",
        width: "100%",
        height: 150,
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
    textInputSubtask: {
        margin: 0,
        padding: 0,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "white",
        backgroundColor: "rgb(240 240 242)",
        color: "#98989a",
        height: 15,
        paddingLeft: 7,
        fontSize: 20,
        fontWeight: "600",
    },
});
