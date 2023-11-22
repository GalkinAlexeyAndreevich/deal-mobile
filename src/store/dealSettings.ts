import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "interfaces";


interface TypeState extends ITask  {
    typeDeal:string,
}
const initialState:TypeState = {
    typeDeal: 'Мелкая сделка',
    typeTask:"",
    nameTask:'',
    time:0
}


const dealSettingsSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setTypeDeal(state,actions:PayloadAction<string>){
            state.typeDeal = actions.payload
        },
        setTypeTask(state,actions:PayloadAction<string>){
            state.typeTask = actions.payload
        },
        setNameTask(state,actions:PayloadAction<string>){
            state.nameTask = actions.payload
        },
        setTime(state,actions:PayloadAction<number>){
            state.time = actions.payload
        },
        addTask(state,actions:PayloadAction<ITask>){
            const {typeTask, nameTask, time} = actions.payload
            state.typeTask = typeTask
            state.nameTask = nameTask
            state.time = time
        }
    },
})

export const {setTypeDeal,setTypeTask,setNameTask,setTime,addTask} = dealSettingsSlice.actions

export default dealSettingsSlice.reducer