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
const keysToFilterOut = ["id","name","done","date","type", "priorityId"]

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
                const myTasks = await getTasks()
                console.log("tasks value",  myTasks);
                const allData = await getTasksWithSubtask() as (Task & SubTask)[]
                console.log("all", allData);
                let formattedArr:Task[] = []
                for(let i=0;i<allData.length;i++){
                    let index = formattedArr.findIndex(element=>element.id==allData[i].id)
                    const {subtask_id, subtask_name, subtask_done} = allData[i]
                    if(index !== -1 && subtask_id){
                        formattedArr[index].subtasks.push({subtask_id, subtask_name, subtask_done:String(subtask_done)=="true"})
                    }
                    else{
                        const newObj = Object
                          .entries(allData[i])
                          .filter(([key]) => keysToFilterOut.includes(key))
                          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as Task;
                        newObj.done = String(newObj.done)=="true"
                        if(subtask_id){
                            formattedArr.push({...newObj, subtasks:[{subtask_id, subtask_name, subtask_done}]}) 
                        }else{
                            formattedArr.push({...newObj, subtasks:[]}) 
                        }
                        
                    }
                }
                console.log("отформатированный массив", formattedArr);
                
                dispatch(setTasks(formattedArr));
               
                
            })
            // export const getTasks = async () => {
            //     const db = SQLite.openDatabase("Deal.db");
            //     return new Promise((resolve, reject) => {
            //         db.transaction((tx) => {
            //             const result = tx.executeSql(
            //                 "SELECT * FROM TASKS",
            //                 [],
            //                 (_, { rows: { _array } }) => {
            //                   resolve(_array);
            //                 }
            //             );
            //         });
            //     });
            // };
            
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
