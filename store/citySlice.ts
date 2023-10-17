import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IDataCity} from "../interfaces";


interface TypeState extends IDataCity {
    searchBy:undefined | "currentPlace" | "nameCity"
}
// const initialState:TypeState = {
//     Key:"293006",
//     LocalizedName:"Калуга",
//     EnglishName:"Kaluga",
//     searchBy:"currentPlace",
// }
const initialState:TypeState = {
    Key:"",
    LocalizedName:"",
    EnglishName:"",
    searchBy:undefined,
}


const citySlice = createSlice({
    name:"city",
    initialState,
    reducers:{
        setCurrentPlace(state,actions:PayloadAction<IDataCity>){
            const  {Key,LocalizedName,EnglishName} = actions.payload
            const newObj:TypeState = {
                Key,LocalizedName,EnglishName,
                searchBy:"currentPlace"
            }
            state = newObj
        },
        setChosenPlace(state,actions:PayloadAction<IDataCity>){
            const  {Key,LocalizedName,EnglishName} = actions.payload
            console.log(Key,LocalizedName,EnglishName);
            
            state.Key = Key
            state.LocalizedName = LocalizedName
            state.EnglishName = EnglishName
        },
        setSearchBy(state,actions:PayloadAction<string>){
            const searchBy = actions.payload
            if(searchBy =="nameCity" || searchBy== "currentPlace"){
                state.searchBy = searchBy
            }  
        },
        setKey(state,actions:PayloadAction<string>){
            const Key = actions.payload
            if(Key)state.Key = Key
        }
    },
})

export const {setCurrentPlace,setChosenPlace,setSearchBy,setKey} = citySlice.actions

export default citySlice.reducer