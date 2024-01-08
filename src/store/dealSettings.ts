import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ITask, Task } from "@interfaces";


interface TypeState {
    typeDeal:string,
    task:Task
    nameTask:string,
    time:number
}
const initialState:TypeState = {
    typeDeal: 'Мелкая сделка',
    task:{} as Task,
    nameTask:'Что-то сделать',
    time:1000*60
}


const dealSettingsSlice = createSlice({
    name:"dealSettings",
    initialState,
    reducers:{
        setTypeDeal(state,actions:PayloadAction<string>){
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
            console.log("Меняю стор",actions.payload);
            
            console.log(task.name);
            state.nameTask = task.name
            console.log(state.nameTask);
            state.task = task
        }
    },
})

export const {setTypeDeal,setNameTask,setTime,addTask} = dealSettingsSlice.actions

export default dealSettingsSlice.reducer