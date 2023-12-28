import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Tasks from "./components/Tasks";
import Ionicons  from "react-native-vector-icons/Ionicons";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { setCurrentDate } from "@store/tasksDatesSlice";
import { timeToString } from "@utils/timeToString";
import AddTask from "@components/AddTask";

moment().locale("ru");

export default function TaskOnDayPage() {
    const currentDate = useAppSelector((state) => state.tasksDates.currentDate);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useAppDispatch();

    const changeDatePicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date
    ) => {
        if (type === "set") {
            setOpenModal(false);
            dispatch(setCurrentDate(timeToString(selectedData)));
        } else {
            setOpenModal(false);
        }
    };

    const addAndSubtractDay = (add:boolean)=>{
        let newDate = ''        
        if(add) {newDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD')}
        else {newDate = moment(currentDate).subtract(1, 'days').format('YYYY-MM-DD')}
        dispatch(setCurrentDate(newDate));
    }

    return (
        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                // opacity:0.8,
               
            }}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                <Pressable style={{padding:10}} onPress={()=>addAndSubtractDay(false)}>
                    <Ionicons name="caret-back-sharp" size={13} color={"#00adf5"}/>
                </Pressable>
                
                
                <Pressable
                    style={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "center",
                        paddingVertical: 5,
                        marginBottom:5
    
                    }}
                    onPress={() => setOpenModal(true)}>
                    <Text style={{ 
                        fontSize: 21,backgroundColor: "#dafffd",  
                        borderWidth:1,                
                        // borderTopWidth:1,
                        // borderBottomWidth:0.8,
                        borderColor: "#a0f7ff",
                        paddingHorizontal:35,
                        paddingVertical:5
                    }}>
                        {moment(currentDate).format("DD MMMM")}
                    </Text>
                </Pressable>
                <Pressable style={{padding:10}} onPress={()=>addAndSubtractDay(true)}>
                    <Ionicons name="caret-forward-sharp" size={13} color={"#00adf5"}/>
                </Pressable>
               
            </View>

            <View style={{
                height:"81.5%",
                borderWidth:1,
                marginHorizontal:14,
                marginBottom:0,
                borderColor:"#acf9ff"
            }}>
                <Tasks />
            </View>
            
            <View
                style={{
                    position: "absolute",
                    top: 670,
                    right: -5,
                }}>
                <AddTask />
            </View>

            {openModal && (
                <RNDateTimePicker
                    value={new Date(currentDate)}
                    onChange={changeDatePicker}
                />
            )}
        </View>
    );
}
