import {
    View,
    Pressable,
    Modal,
    StyleSheet,
    TouchableHighlight,
    Text,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { Task } from "@interfaces";
import { Input } from "@rneui/themed";
import Fuse from "fuse.js";
import { addTask } from "@store/dealSettings";
import AddTask from "@components/AddTask";

const fuseOptions = {
    keys: ["name"],
};

export default function ModalChooseTask() {
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedTask, setSelectedTask] = useState({} as Task);
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [filtered1, setFiltered1] = useState<Task[]>([]);
    const [filtered2, setFiltered2] = useState<Task[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const newArr = tasks.filter(
            (task) => new Date(task.date).getDate() === new Date().getDate()
        );
        setFiltered1(tasks);
    }, [tasks]);

    useEffect(() => {
        Object.keys(selectedTask).length && dispatch(addTask(selectedTask));
    }, []);

    useEffect(() => {
        Object.keys(selectedTask).length && dispatch(addTask(selectedTask));
    }, [selectedTask]);

    const search = () => {
        setFiltered2([]);
        const fuse = new Fuse(filtered1, fuseOptions)
            .search(inputValue)
            .map((item) => item.item);
        fuse.length && setFiltered2(fuse);
        !inputValue.length && setFiltered2(filtered1);
    };
    useEffect(search, [filtered1, inputValue]);

    return (
        <>
            <Pressable
                onPress={() => {
                    setOpenModal(true);
                }}
                style={{
                    // flex: 1,
                    // width: 200,
                    height: 50,
                    zIndex: 2,
                    padding: 15,
                    borderRadius: 100,
                    marginHorizontal: 10,
                    backgroundColor: "#d9fcff",
                    display: "flex",
                    alignItems: "stretch",
                    
                    // width:"100%"
                }}>
                <Text style={{opacity:0.5}}>
                    {Object.keys(selectedTask).length > 0
                        ? selectedTask.name
                        : "Выберите цель из списка"}
                </Text>
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
                        <View style={{ paddingHorizontal: 10, width: 300 }}>
                            <Input
                                value={inputValue}
                                placeholder="Найти цель по имени"
                                onChangeText={(text) => setInputValue(text)}
                                inputStyle={{
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingLeft: 7,
                                }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                            />
                        </View>
                        <FlatList
                            data={filtered2}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderWidth: 1,
                                        backgroundColor:
                                            selectedTask === item
                                                ? "#dafffd"
                                                : "white",
                                    }}
                                    onPress={() => {
                                        console.log("Выбранное задание", item);

                                        setSelectedTask(item);
                                        setOpenModal(false);
                                    }}>
                                    <Text>{item.name}</Text>
                                </Pressable>
                            )}
                            keyExtractor={(task) => String(task.id)}
                        />
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
        // flexDirection: "row",
        // alignItems: "center",
    },
    background: {
        flex: 1,
        backgroundColor: "black",
        opacity: 0.5,
        zIndex: 1,
    },
    outerContainer: {
        zIndex: 2,
        // position: "absolute",
        // alignItems: "stretch",
        width: "100%",
        height: "70%",
        backgroundColor: "white",
        // bottom: 0,
    },
});

// const styles = StyleSheet.create({
//     container: {
//         margin: 5,
//         backgroundColor: "white",
//         display: "flex",
//         justifyContent: "center",
//         // flex:1,
//         // flexDirection: "row",
//         alignItems: "center",
//     },
//     background: {
//         flex: 1,
//         backgroundColor: "black",
//         opacity: 0.5,
//         zIndex: 1,
//     },
//     outerContainer: {
//         zIndex: 2,
//         backgroundColor: "white",
//         display: "flex",
//         justifyContent: "center",
//         // flexDirection: "row",
//         alignItems: "center",
//         // position: "absolute",
//         // alignItems: "stretch",
//         // width: "100%",
//         // height: 150,
//         // backgroundColor: "white",
//         // bottom: 0,
//     },
// });
