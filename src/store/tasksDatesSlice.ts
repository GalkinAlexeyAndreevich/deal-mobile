import { SubTask, Task } from "@interfaces";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { defaultSubtasks, defaultTasks } from "@utils/dataNoFetch";

const timeToString = (time: Date | string): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

interface TypeState{
    currentDate:string,
    tasks:Task[],
    subtasks:SubTask[]
}

const initialState:TypeState = {
    currentDate:timeToString(new Date()),
    tasks:defaultTasks,
    subtasks:defaultSubtasks
}


const tasksDatesSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setCurrentDate(state,actions:PayloadAction<string>){
            state.currentDate = actions.payload
        },
        setTasks(state,actions:PayloadAction<Task[]>){
            state.tasks = actions.payload
        },
        setSubTasks(state,actions:PayloadAction<SubTask[]>){
            state.subtasks = actions.payload
        }
    },
})

export const {setCurrentDate,setTasks,setSubTasks} = tasksDatesSlice.actions

export default tasksDatesSlice.reducer