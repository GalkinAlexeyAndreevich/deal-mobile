import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "./store/hook";
import { setTasks, setType } from "./store/tasksDatesSlice";
import { defaultTasks, defaultTypeTasks } from "./utils/dataNoFetch";
import type {ResultSetRowList} from "react-native-sqlite-storage"
import { createTables, getTasks, getTasksWithSubtask } from "db";
import type { SubTask, Task } from "./interfaces";

const SavedDataContext = createContext({});

interface Props {
    children: React.ReactNode;
}
export interface ResultSet {
    insertId: number;
    rowsAffected: number;
    rows: ResultSetRowList;
}

export const SavedDataProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    console.log("Достаю сохраненные данные");
    useEffect(() => {
        async function getSaveData() {
            // let tasks = await JSON.parse(
            //     (await AsyncStorage.getItem("savedTask")) || "[]"
            // );
            // tasks = []
            let typesTask = await JSON.parse(
                (await AsyncStorage.getItem("savedTypesTask")) || "[]"
            );

            // if (!tasks || !tasks.length) {
            //     await AsyncStorage.setItem("savedTask", JSON.stringify(defaultTasks));
            //     dispatch(setTasks(defaultTasks));
            // }
            // else dispatch(setTasks(tasks));
            
            AsyncStorage.setItem("savedTask",JSON.stringify([]))
            if (!typesTask || !typesTask.length) {
                await AsyncStorage.setItem(
                    "savedTypesTask",
                    JSON.stringify(defaultTypeTasks)
                );
                dispatch(setType(defaultTypeTasks));
            }
            else dispatch(setType(defaultTypeTasks));

            console.log("Сохраненные данные перенесены");
        }
        getSaveData();
        try{
            createTables().then(async()=>{
                const allData = await getTasksWithSubtask() as (Task & SubTask)[]
                let formattedArr:Task[] = []
                for(let i=0;i<allData.length;i++){
                    let index = formattedArr.findIndex(element=>element.id==allData[i].id)
                    const {subtask_id, subtask_name, subtask_done,subtask_priorityId} = allData[i]
                    if(index !== -1 && subtask_id){
                        formattedArr[index].subtasks.push({subtask_id, subtask_name, subtask_done:String(subtask_done)=="true",subtask_priorityId})
                    }
                    else{
                        let {id, name, done, date, typeId, priorityId} = allData[i]
                        done = String(done)=="true"
                        if(subtask_id){
                            formattedArr.push({
                                id, name, done, date, typeId, priorityId, 
                                subtasks:[{subtask_id, subtask_name, subtask_done: String(subtask_done)=="true",subtask_priorityId}]}) 
                        }else{
                            formattedArr.push({id, name, done, date, typeId, priorityId,  subtasks:[]}) 
                        }  
                    }
                }
                console.log("отформатированный массив", formattedArr);
                dispatch(setTasks(formattedArr));    
            })
        }catch(err){
            console.log("error in db", err);
        }
    }, []);

    return (
        <SavedDataContext.Provider value={{}}>
            {children}
        </SavedDataContext.Provider>
    );
};
export const useSavedData = () => useContext(SavedDataContext);
