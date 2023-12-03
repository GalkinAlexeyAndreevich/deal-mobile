import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const timeToString = (time: any): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

const initialState = {
    currentDate:timeToString(new Date())
}


const tasksDatesSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setCurrentDate(state,actions:PayloadAction<string>){
            console.log("change state", actions.payload);
            
            state.currentDate = actions.payload
        },
        
    },
})

export const {setCurrentDate} = tasksDatesSlice.actions

export default tasksDatesSlice.reducer