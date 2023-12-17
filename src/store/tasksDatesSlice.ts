import { Task } from "@interfaces";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { defaultTasks } from "@utils/dataNoFetch";

const timeToString = (time: any): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

interface TypeState{
    currentDate:string,
    tasks:Task[]
}

const initialState:TypeState = {
    currentDate:timeToString(new Date()),
    tasks:defaultTasks
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
        }
    },
})

export const {setCurrentDate,setTasks} = tasksDatesSlice.actions

export default tasksDatesSlice.reducer