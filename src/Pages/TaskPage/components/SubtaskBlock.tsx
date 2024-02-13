import { View, Text, Pressable } from "react-native";
import React, { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import DraggableFlatList, {
    type RenderItemParams,
} from "react-native-draggable-flatlist";
import type { SubTask, Task } from "@src/interfaces";
import { useAppDispatch } from "@src/store/hook";
import {
    addSubtaskInTask,
    changeArrSubtaskInTask,
    deleteSubtask,
    setNameTask,
    setSubtask,
} from "@src/store/tasksDatesSlice";
import Fontisto from "react-native-vector-icons/Fontisto";
import Subtasks from "./Subtasks";
import uuid from 'react-native-uuid';

interface Props {
    task: Task;
    changed: boolean;
    setChanged: Dispatch<SetStateAction<boolean>>;
    uniqueId:string
}

export default function SubtaskBlock({ task, changed, setChanged,uniqueId }: Props) {
    const dispatch = useAppDispatch();
    const [visibleSubtasks, setVisibleSubtask] = useState<SubTask[]>([])
    // console.log(visibleSubtasks);
    useEffect(()=>{
        console.log("this new render");
        setVisibleSubtask(task.subtasks)
    },[uniqueId])
    const addSubtask = ()=>{
        const newSubtask:SubTask = {
            id:String(uuid.v4()),
            name:'',
            done:false
        }
        setVisibleSubtask(prev=>[newSubtask,...prev])
    }
    const changeNameTask = (
        text: string,
        task: Task,
        subtask: SubTask = {} as SubTask
    ) => {
        console.log(text, task.id);
        if (!text && subtask.name?.length) return;
        const subtaskCopy = [...visibleSubtasks]
        let subtaskIndex = subtaskCopy.findIndex(element=>element.id == subtask.id)
        console.log(subtaskCopy[subtaskIndex]?.name);
                
        if(text.length && !subtaskCopy[subtaskIndex]?.name?.length){
            console.log("create");
            subtaskCopy[subtaskIndex] = {...subtaskCopy[subtaskIndex], name:text}
            let subtasks = subtaskCopy.filter(element=>element.name != '')
            console.log("filtered subtask", subtask);
            
            dispatch(addSubtaskInTask({taskId:task.id, subtasks}))
        }else{
            console.log('change', text);
            
            subtaskCopy[subtaskIndex] = {...subtaskCopy[subtaskIndex], name:text}
            console.log("set name",subtaskCopy[subtaskIndex] );
            
            dispatch(
                setNameTask({ text, taskId: task.id, subtaskId: subtask?.id })   
            );
        }
        setVisibleSubtask(subtaskCopy)
    };

    const deleteSubtaskHandler = (subtaskId:string)=>{
        console.log('delete');
        
        setVisibleSubtask(prev=>prev.filter(element=>element.id != subtaskId))
        dispatch(
            deleteSubtask({
                taskId: task.id,
                subtaskId: subtaskId,
            })
        )
    }

    const changeStatusSubtask = (subtaskId:string)=>{
        const subtasksCopy = [...visibleSubtasks]
        const subtaskIndex = subtasksCopy.findIndex(element=>element.id == subtaskId)
        if(subtasksCopy[subtaskIndex]?.name.length){
            dispatch(
                setSubtask({
                    subtaskId: subtaskId,
                    taskId: task.id,
                })
            )
        }else{
            subtasksCopy[subtaskIndex] = {...subtasksCopy[subtaskIndex], done:!subtasksCopy[subtaskIndex].done}
            setVisibleSubtask(subtasksCopy)
        }

    }


    const checkDif = (
        taskId: string,
        prevData: SubTask[],
        subtasks: SubTask[]
    ) => {
        console.log(prevData);
        console.log(subtasks);
        setVisibleSubtask(subtasks)
        const finalSubtasks = subtasks.filter(element=>element.name != '')
        dispatch(changeArrSubtaskInTask({ taskId, subtasks:finalSubtasks }));
    };
    return (
        <View>
            <DraggableFlatList
                style={{ height: 200 }}
                // scrollEnabled={false}
                data={visibleSubtasks}
                onDragEnd={({ data }) => checkDif(task.id, task.subtasks, data)}
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
                        deleteSubtask={deleteSubtaskHandler}
                        changeStatusSubtask={changeStatusSubtask}
                    />
                )}
            />

            <Pressable
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop:20
                }}
                onPress={addSubtask}
                >
                <Fontisto name="plus-a" color={"black"} size={18} />
                <Text style={{ paddingLeft: 10, fontSize: 20 }}>
                    Добавить подцель
                </Text>
            </Pressable>
        </View>
    );
}
