import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAppSelector } from "@store/hook";
import {  useBackgroundTimer } from "@src/TimerContext";

const clockify = (secondsLeft:number) => {
    let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)
    return {
        hours,
        mins,
        seconds,
    }
}

export default function MiniTimer({navigation}) {
    const {secondsLeft} = useBackgroundTimer()
    const {hours, mins, seconds} = clockify(secondsLeft)

    if(!secondsLeft){
        return <View></View>
    }
    return (
        <Pressable onPress={()=>{navigation.navigate("AddTask")}} style={{borderWidth:1, zIndex:2, padding:10, backgroundColor:"white"}}>
            <Text style={{fontSize:17}}>
                {hours > 0 && (hours > 10 ? hours : "0" + hours) + ":"}
                {mins < 10 ? "0" + mins : mins}:
                {seconds < 10 ? "0" + seconds : seconds}
            </Text>
        </Pressable>
    );
}
