import {
    View,
    Text,
    Pressable,
    TextInput,
    StyleSheet,
    type ScrollView,
} from "react-native";
import React, {
    useState,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useRef,
    type RefObject,
} from "react";
import {
    NestableDraggableFlatList,
    type RenderItemParams,
} from "react-native-draggable-flatlist";
import type { SubTask, Task } from "@src/interfaces";
import { useAppDispatch } from "@src/store/hook";
import {
    addSubtaskInTask,
    changeArrSubtaskInTask,
    setNameTask,
} from "@src/store/tasksDatesSlice";
import Subtasks from "./Subtasks";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import { addSubtaskDb, setOrderSubtask } from "db";

interface Props {
    task: Task;
    changed: boolean;
    setChanged: Dispatch<SetStateAction<boolean>>;
    uniqueId: string;
    scrollViewRef: RefObject<ScrollView> | null;
}

export default function SubtaskBlock({
    task,
    changed,
    setChanged,
    uniqueId,
    scrollViewRef,
}: Props) {
    const dispatch = useAppDispatch();
    const [subtaskValue, setSubtaskValue] = useState("");
    // const [modeCreate, setModeCreate] = useState(false);
    const subtaskRef = useRef<TextInput>(null);
    const [sortedArr, setSortedArr] = useState<SubTask[]>([])
    const [statusSubtask, setStatusSubtask] = useState(false);
    const clearInput = () => {
        setSubtaskValue("");
        // setModeCreate(false);
        setStatusSubtask(false);
    };
    useEffect(clearInput, [uniqueId]);
    // console.log(visibleSubtasks);
    const addSubtask = () => {
        if (!subtaskValue.length) return;
        console.log("try add new subtask");
        
        const newSubtask: SubTask = {
            subtask_id: new Date().getTime(),
            subtask_name: subtaskValue,
            subtask_done: statusSubtask,
            subtask_priorityId:0
        };
        clearInput();
        addSubtaskDb(newSubtask,task.id)
        dispatch(addSubtaskInTask({ taskId: task.id, subtask: newSubtask }));
    };

    useEffect(()=>{
        let copyArr = JSON.parse(JSON.stringify(task.subtasks)) as SubTask[]
        setSortedArr(copyArr.sort((a,b)=>a.subtask_priorityId>b.subtask_priorityId?1:-1))
    },[task.subtasks])
    const changeNameTask = (
        text: string,
        task: Task,
        subtask: SubTask = {} as SubTask
    ) => {
        // if (!text.length) return;
        dispatch(
            setNameTask({ text, taskId: task.id, subtaskId: subtask?.subtask_id })
        );
    };

    const checkDif = (taskId: number, subtasks: SubTask[]) => {
        let finalSubtasks = JSON.parse(JSON.stringify(subtasks))
        for(let i=0;i<finalSubtasks.length;i++){
            finalSubtasks[i].subtask_priorityId = i
        }
        setOrderSubtask(subtasks)
        dispatch(changeArrSubtaskInTask({ taskId, subtasks:finalSubtasks }));
    };
    return (
        <>
            {/* <Text>Редактирование подцелей</Text> */}
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <CheckBox
                        size={12}
                        checked={statusSubtask}
                        onPress={() => {
                            setStatusSubtask((prev) => !prev);
                        }}
                        checkedColor="black"
                        checkedIcon={<FontAwesome name="circle" size={12} />}
                        uncheckedIcon={
                            <FontAwesome name="circle-o" size={12} />
                        }
                    />

                    <TextInput
                        ref={subtaskRef}
                        style={styles.input}
                        multiline={true}
                        maxLength={50}
                        value={subtaskValue}
                        onChangeText={(text) => setSubtaskValue(text)}
                        blurOnSubmit={true}
                        onSubmitEditing={() => addSubtask()}
                        // onEndEditing={() => addSubtask()}
                        placeholder="введите подцель"
                    />
                </View>

                <Pressable
                    style={{ padding: 3, marginRight: 10 }}
                    onPress={() => clearInput()}>
                    <Icon name="close" size={25} color="red" />
                </Pressable>
            </View>
            <View>
                {/* <NestableScrollContainer> */}
                <NestableDraggableFlatList
                    scrollEnabled={false}
                    data={sortedArr}
                    onDragEnd={({ data }) => checkDif(task.id, data)}
                    // onDragBegin={() => setOuterScrollEnabled(false)}
                    keyExtractor={(item) => String(item. subtask_id)}
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
                    // activationDistance={20}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        borderBottomWidth: 0,
        maxHeight: 100,
        width: "75%",
    },
    add: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
        opacity: 0.5,
    },
});
