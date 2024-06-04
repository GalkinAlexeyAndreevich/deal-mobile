import React, { createContext, useContext, useEffect } from "react";
import { useAppDispatch } from "./store/hook";
import { setTasks, setType } from "./store/tasksDatesSlice";
import { createTables, getTasksWithSubtask, getTypeTask } from "db";
import type { ITypeTask, SubTask, Task } from "./interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBackgroundTimer } from "./TimerContext";
import { setNameTask } from "./store/dealSettings";
import moment from "moment";

const SavedDataContext = createContext({});

interface Props {
    children: React.ReactNode;
}

export const SavedDataProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    const {setTimerOn, setTimeEnd, setPausedBegin, setDifPause,setBeginTimer} = useBackgroundTimer()
    useEffect(() => {
        async function getDataFromDb() {
            await createTables();
            const typeTask = (await getTypeTask()) as ITypeTask[];
            dispatch(setType(typeTask));
            const allData = (await getTasksWithSubtask()) as (Task & SubTask)[];
            let formattedArr: Task[] = [];
            for (let i = 0; i < allData.length; i++) {
                let index = formattedArr.findIndex(
                    (element) => element.id == allData[i].id
                );
                const {
                    subtask_id,
                    subtask_name,
                    subtask_done,
                    subtask_priorityId,
                } = allData[i];
                if (index !== -1 && subtask_id) {
                    formattedArr[index].subtasks.push({
                        subtask_id,
                        subtask_name,
                        subtask_done: String(subtask_done) == "true",
                        subtask_priorityId,
                    });
                } else {
                    let { id, name, done, date, typeId, priorityId } =
                        allData[i];
                    done = String(done) == "true";
                    if (subtask_id) {
                        formattedArr.push({
                            id,
                            name,
                            done,
                            date,
                            typeId,
                            priorityId,
                            subtasks: [
                                {
                                    subtask_id,
                                    subtask_name,
                                    subtask_done:
                                        String(subtask_done) == "true",
                                    subtask_priorityId,
                                },
                            ],
                        });
                    } else {
                        formattedArr.push({
                            id,
                            name,
                            done,
                            date,
                            typeId,
                            priorityId,
                            subtasks: [],
                        });
                    }
                }
            }
            dispatch(setTasks(formattedArr));
        }
        try {
            getDataFromDb().then(async () => {
                let timerInfoString =
                    (await AsyncStorage.getItem("timerInfo")) || "";
                    
                if (timerInfoString.length) {
                    let timerInfo = JSON.parse(timerInfoString) as {
                        timeOn: boolean;
                        diffPause: number;
                        timeEnd: string;
                        pausedBegin: string;
                        nameTask: string;
                    };
                    console.log("Данные о таймере", timerInfo);
                    setTimeEnd(timerInfo?.timeEnd || "");
                    setPausedBegin(timerInfo?.pausedBegin || "");
                    setDifPause(timerInfo?.diffPause || 0);
                    dispatch(setNameTask(timerInfo?.nameTask))
                    setTimerOn(timerInfo?.timeOn || false);
                    let pauseTime = (timerInfo?.pausedBegin.length)?moment().diff(moment(timerInfo?.pausedBegin),'seconds'):0 
                    console.log((moment(timerInfo?.timeEnd).diff(moment(), 'seconds') || 0) , pauseTime, timerInfo?.diffPause);
                    console.log(pauseTime);
                    let timePause = (pauseTime || 0) + Math.floor((timerInfo?.diffPause ||0)/1000)
                    setBeginTimer({
                        timeOn:timerInfo?.timeOn || false,
                        time:(moment(timerInfo?.timeEnd).diff(moment(), 'seconds') || 0) + pauseTime + Math.floor((timerInfo?.diffPause ||0)/1000),
                        timePause:timePause
                    })
                }
            });
        } catch (err) {
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
