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
    let {setTimerOn, setTimeEnd, setPausedBegin, setDifPause,setBeginTimer} = useBackgroundTimer()
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
                        timerOn: boolean;
                        diffPause: number;
                        timeEnd: string;
                        pausedBegin: string;
                        nameTask: string;
                    };
                    console.log("Данные о таймере", timerInfo);
                    setTimeEnd(timerInfo?.timeEnd || "");
                    setPausedBegin(timerInfo?.pausedBegin || "");
                    setDifPause(timerInfo?.diffPause || 0);
                    setTimerOn(timerInfo?.timerOn || false);
                    dispatch(setNameTask(timerInfo?.nameTask))
                    
                    let pauseTime = (timerInfo?.pausedBegin.length)?moment().diff(moment(timerInfo?.pausedBegin),'seconds'):0 

                    console.log(pauseTime);
                    console.log("Проверкка паузы", timerInfo?.timerOn || false);
                    let dif = timerInfo?.timeEnd.length?(moment(timerInfo?.timeEnd).diff(moment(), 'seconds')):0
                    let timePause = (pauseTime || 0) + Math.round((timerInfo?.diffPause ||0)/1000)
                    let time = dif + timePause
                    
                    console.log(dif, pauseTime, timePause, timerInfo?.diffPause,time);
                    setBeginTimer({
                        timeOn:timerInfo?.timerOn || false,
                        time:Number.isNaN(time) || time<=0?0:time,
                        timePause:timePause
                    })
                    console.log("Данные о паузе",timerInfo?.timerOn, Boolean(timerInfo?.timerOn) || false);
                    
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
