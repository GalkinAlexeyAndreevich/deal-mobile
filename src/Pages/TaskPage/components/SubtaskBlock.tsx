import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React, {
    useState,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useRef,
} from "react";
import DraggableFlatList, {
    type RenderItemParams,
} from "react-native-draggable-flatlist";
import type { SubTask, Task } from "@src/interfaces";
import { useAppDispatch } from "@src/store/hook";
import {
    addSubtaskInTask,
    changeArrSubtaskInTask,
    setNameTask,
} from "@src/store/tasksDatesSlice";
import Fontisto from "react-native-vector-icons/Fontisto";
import Subtasks from "./Subtasks";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";

interface Props {
    task: Task;
    changed: boolean;
    setChanged: Dispatch<SetStateAction<boolean>>;
    uniqueId: string;
}

export default function SubtaskBlock({
    task,
    changed,
    setChanged,
    uniqueId,
}: Props) {
    const dispatch = useAppDispatch();
    const [subtaskValue, setSubtaskValue] = useState("");
    const [modeCreate, setModeCreate] = useState(false);
    const subtaskRef = useRef<TextInput>(null)
    const [statusSubtask, setStatusSubtask] = useState(false)
    const clearInput = () => {
        setSubtaskValue("");
        setModeCreate(false);
        setStatusSubtask(false)
    };
    useEffect(clearInput,[uniqueId])
    // console.log(visibleSubtasks);
    const addSubtask = () => {
        if (!subtaskValue.length) return;
        const newSubtask: SubTask = {
            id: String(uuid.v4()),
            name: subtaskValue,
            done: statusSubtask,
        };
        clearInput();
        dispatch(addSubtaskInTask({ taskId: task.id, subtask: newSubtask }));
    };

    const changeNameTask = (
        text: string,
        task: Task,
        subtask: SubTask = {} as SubTask
    ) => {
        if(!text.length)return
        dispatch(
            setNameTask({ text, taskId: task.id, subtaskId: subtask?.id })
        );
    };
    const redRound = ():React.ReactElement=>{
        return(
            <View style={{paddingRight:3, paddingTop:3}}>
                <View style={{backgroundColor:'red', width:16, height:16, borderRadius:50}}></View>
            </View>
            
        )
    }


    const checkDif = (
        taskId: string,
        subtasks: SubTask[]
    ) => {
        dispatch(changeArrSubtaskInTask({ taskId, subtasks }));
    };
    return (
        <>
            {modeCreate && (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                <CheckBox
                    size={12}
                    checked={statusSubtask}
                    onPress={() =>{
                        setStatusSubtask(prev=>!prev)
                    }}
                    checkedColor="red"
                    checkedIcon={redRound()}
                    uncheckedIcon="circle-o"
                />
                    <TextInput
                        ref={subtaskRef}
                        style={styles.input}
                        multiline={true}
                        maxLength={50}
                        value={subtaskValue}
                        onChangeText={(text) => setSubtaskValue(text)}
                        onEndEditing={() => addSubtask()}
                        placeholder="введите подцель"
                        autoFocus={true}
                        
                    />
                    <Pressable
                        style={{ padding: 3, marginRight: 10 }}
                        onPress={() => clearInput()}>
                        <Icon name="close" size={25} color="red" />
                    </Pressable>
                </View>
            )}

            <DraggableFlatList
                style={{ height: '70%' }}
                // scrollEnabled={false}
                data={task.subtasks}
                onDragEnd={({ data }) => checkDif(task.id, data)}
                // onDragBegin={() => setOuterScrollEnabled(false)}
                keyExtractor={(item) => String(item.id)}
                renderItem={({
                    item,
                    drag,
                    isActive,
                }: RenderItemParams<SubTask>) => (
                    <Subtasks
                        subtask={item}
                        task={task}
                        changeNameTask={changeNameTask}
                        drag={drag}
                        isActive={isActive}
                        changed={changed}
                        setChanged={setChanged}
                    />
                )}
                // simultaneousHandlers={scrollViewRef}
                // activationDistance={50}
            />

            <Pressable style={styles.add} onPress={() => {
                if(modeCreate && subtaskValue.length)addSubtask()
                setModeCreate(true)
                console.log("open");
                subtaskRef.current?.focus()
                }}>
                <Fontisto name="plus-a" color={"black"} size={18} />
                <Text style={{ paddingLeft: 10, fontSize: 20 }}>
                    Добавить подцель
                </Text>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        borderBottomWidth: 0,
        // textDecorationLine: "underline",
        width: "75.5%",
        // fontWeight: "bold",
        paddingVertical: 10,
    },
    add: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
        // paddingLeft:17,
        opacity:0.5
    },
});
