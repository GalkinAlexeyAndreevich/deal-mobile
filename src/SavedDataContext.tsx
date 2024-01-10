import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { setTasks, setType } from "./store/tasksDatesSlice";
import { defaultTypeTasks } from "./utils/dataNoFetch";

const SavedDataContext = createContext({});

interface Props {
    children: React.ReactNode;
}
export const SavedDataProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    console.log("Достаю сохраненные данные");
    useEffect(() => {
        async function getSaveData() {
            await AsyncStorage.removeItem("savedTask")
            let tasks = await JSON.parse(await AsyncStorage.getItem("savedTask"));
            let typesTask = await JSON.parse(
                await AsyncStorage.getItem("savedTypesTask")
            );
            if (!tasks || !tasks.length) {
                AsyncStorage.setItem("savedTask", JSON.stringify([]));
            } else {
              dispatch(setTasks(tasks));
            }
            if (!typesTask || !typesTask.length) {
                AsyncStorage.setItem(
                    "savedTypesTask",
                    JSON.stringify(defaultTypeTasks)
                );
            } else {
                dispatch(setType(typesTask));
            }
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
