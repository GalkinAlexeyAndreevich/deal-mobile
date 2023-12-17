import {
    View,
    Text,
    Pressable,
    TextInput,
    Modal,
    StyleSheet,
    TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import { typeTasks } from "@utils/dataNoFetch";
import { ITypeTask, Task } from "@interfaces";
import { Input } from "react-native-elements";
import { setTasks } from "@store/tasksDatesSlice";
// import { Modal } from "react-native-paper";

export default function AddTask() {
    const { currentDate, tasks } = useAppSelector((state) => state.tasksDates);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [typeTask, setTypeTask] = useState<ITypeTask[]>(typeTasks);
    const [chosenType, setChosenType] = useState<ITypeTask>(typeTask[0]);
    console.log(currentDate);

    const saveChange = () => {
        setOpenModal(false);
        console.log(currentDate);

        const object: Task = {
            id: tasks.length,
            name: inputValue,
            done: false,
            date: currentDate,
            type: chosenType.value,
        };
        dispatch(setTasks([...tasks, object]));
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
                    position: "absolute",
                    bottom: 40,
                    right: 10,
                    zIndex: 2,
                }}>
                <AntIcon name="pluscircle" color={"#3390ee"} size={60} />
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
                <View style={styles.outerContainer}>
                    <View style={styles.container}>
                        <View style={{ width: 370, marginVertical: 7, paddingLeft:7 }}>
                            <TextInput
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: "white",
                                    backgroundColor: "rgb(240 240 242)",
                                    color: "#98989a",
                                    height: 65,
                                    paddingLeft: 7,
                                    fontSize: 20,
                                    fontWeight: "600",
                                }}
                                placeholderTextColor="#98989a"
                                placeholder="Введите цель"
                                value={inputValue}
                                onChangeText={(text) => setInputValue(text)}
                            />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingHorizontal: 10,
                            }}>
                            <View style={{ maxWidth: 180 }}>
                                <RNPickerSelect
                                    onValueChange={(value) =>
                                        setChosenType(value)
                                    }
                                    items={typeTask}
                                    placeholder={{}}
                                    useNativeAndroidPickerStyle={false}
                                    style={pickerSelectStyles}
                                />
                            </View>
                            <Pressable
																disabled={inputValue.length<1}
                                style={{
                                    marginRight: 10,
                                    borderRadius: 50,
                                    backgroundColor: inputValue.length<1?"#cfcdcd":"#6f699b",
																		paddingVertical:10,
																		paddingHorizontal:13
                                }}
                                onPress={inputValue.length>1 && saveChange}>
                                <FontAwesome name="location-arrow" size={25} color={"white"} />
                            </Pressable>
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
        position: "absolute",
        alignItems: "stretch",
        width: "100%",
        height: 150,
        backgroundColor: "white",
        bottom: 0,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        // paddingVertical: 12,
        // paddingHorizontal: 10,
        marginVertical: 0,
        paddingVertical: 0,
        borderWidth: 0,
        borderColor: "gray",
        borderRadius: 4,
        color: "#98989a",
        backgroundColor: "#f2f2f2",
        // marginRight: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    placeholder: {
        color: "red",
    },
    inputAndroid: {
        fontSize: 16,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        marginVertical: 0,
        paddingVertical: 0,
        paddingLeft: 10,
        borderWidth: 0,
        borderColor: "white",
        borderRadius: 8,
        color: "#98989a",
        backgroundColor: "#f2f2f2",
        // marginRight: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputWeb: {
        fontSize: 16,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        paddingLeft: 10,
        borderWidth: 0,
        borderColor: "black",
        borderRadius: 8,
        color: "#98989a",
        marginRight: 10,
        backgroundColor: "#f2f2f2",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
