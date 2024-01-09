import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Task, TypeDeal } from "@interfaces";
import { getArrMinutes } from "@utils/dataNoFetch";

const arrMinutes = getArrMinutes()
interface TypeState {
    typeDeal:TypeDeal,
    task:Task
    nameTask:string,
    time:number,
    prevTime:number
}
const initialState:TypeState = {
    typeDeal: 'Мелкая сделка',
    task:{} as Task,
    nameTask:'',
    time:0,
    prevTime:arrMinutes[0] *1000 * 60
}


const dealSettingsSlice = createSlice({
    name:"dealSettings",
    initialState,
    reducers:{
        setTypeDeal(state,actions:PayloadAction<TypeDeal>){
            state.typeDeal = actions.payload
        },
        setNameTask(state,actions:PayloadAction<string>){
            state.nameTask = actions.payload
        },
        setTime(state,actions:PayloadAction<number>){
            state.time = actions.payload
        },
        addTask(state,actions:PayloadAction<Task>){
            const task = actions.payload
            state.nameTask = task.name
            console.log(state.nameTask);
            state.task = task
        }
    },
})

export const {setTypeDeal,setNameTask,setTime,addTask} = dealSettingsSlice.actions

export default dealSettingsSlice.reducer