import React, { createContext, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "./store/hook";
import { setTasks, setType } from "./store/tasksDatesSlice";
import { defaultTasks, defaultTypeTasks } from "./utils/dataNoFetch";

const SavedDataContext = createContext({});

interface Props {
    children: React.ReactNode;
}
export const SavedDataProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    console.log("Достаю сохраненные данные");
    useEffect(() => {
        async function getSaveData() {
            let tasks = await JSON.parse(
                (await AsyncStorage.getItem("savedTask")) || "[]"
            );
            let typesTask = await JSON.parse(
                (await AsyncStorage.getItem("savedTypesTask")) || "[]"
            );
            console.log(tasks);

            if (!tasks || !tasks.length) {
                await AsyncStorage.setItem("savedTask", JSON.stringify(defaultTasks));
                dispatch(setTasks(defaultTasks));
            }
            else dispatch(setTasks(tasks));
            

            if (!typesTask || !typesTask.length) {
                await AsyncStorage.setItem(
                    "savedTypesTask",
                    JSON.stringify(defaultTypeTasks)
                );
                dispatch(setType(defaultTypeTasks));
            }
            else dispatch(setType(typesTask));

            console.log("Сохраненные данные перенесены");
        }
        getSaveData();
    }, []);

    return (
        <SavedDataContext.Provider value={{}}>
            {children}
        </SavedDataContext.Provider>
    );
};
export const useSavedData = () => useContext(SavedDataContext);
