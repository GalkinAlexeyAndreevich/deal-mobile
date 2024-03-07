import {
    View,
    StyleSheet,
    Pressable,
    Text,
    ScrollView,
    TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/routes/TabNavigator";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import TypeTaskSelect from "./components/TypeTaskSelect";
import TaskInput from "./components/TaskInput";
import SubtaskBlock from "./components/SubtaskBlock";
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { NestableScrollContainer } from "react-native-draggable-flatlist";

type Props = NativeStackScreenProps<RootStackParamList, "TaskPage">;

export default function TaskPage({ navigation, route }: Props) {
    const { taskId, uniqueId,currentDate } = route.params;
    const { tasks } = useAppSelector((state) => state.tasksDates);
    const [changed, setChanged] = useState(false);
    const [openSubtask, setOpenSubtask] = useState(true);
    const task = tasks.find((element) => element.id == taskId);
    const scrollViewRef = useRef<ScrollView>(null);

    if (!task) {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ padding: 5 }}>
                    <AntDesign name="back" size={20} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <NestableScrollContainer>
                <View>
                    <Pressable
                        onPress={() => navigation.navigate("TaskOnDayPage", {
                            dateNow:new Date(currentDate).toISOString()
                        })}
                        style={{
                            width: 40,
                            height: 40,
                        }}>
                        <AntDesign name="back" color={"red"} size={30} />
                    </Pressable>
                    <View>
                        <Text style={{ paddingBottom: 5,fontSize:20 }}>
                            Редактирование категории
                        </Text>
                        <TypeTaskSelect task={task} />
                    </View>
                </View>
                <View style={{ paddingTop: 30 }}>
                    <Text style={{fontSize:20,paddingBottom:5}}>Цели и подцели</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <TaskInput task={task} />
                        <View
                            style={{
                                marginTop: 5,
                                marginRight: 10,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Pressable
                                style={{
                                    padding: 3,
                                }}
                                onPress={() => setOpenSubtask((prev) => !prev)}>
                                {openSubtask ? (
                                    <Icon
                                        name="keyboard-arrow-down"
                                        size={25}
                                    />
                                ) : (
                                    <Icon name="keyboard-arrow-up" size={25} />
                                )}
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ display: openSubtask ? "flex" : "none" }}>
                        <SubtaskBlock
                            task={task}
                            changed={changed}
                            setChanged={setChanged}
                            uniqueId={uniqueId}
                            scrollViewRef={scrollViewRef}
                        />
                    </View>
                </View>
            </NestableScrollContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 10,
        paddingTop: 5,
    },
});
