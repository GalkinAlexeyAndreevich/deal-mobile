import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAppSelector } from "@store/hook";
const secondToCombineTime = (time: number) => {
    return {
        hour: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
    };
};

export default function MiniTimer({navigation}) {
    const { time } = useAppSelector((state) => state.dealSettings);
    const { hour, minutes, seconds } = secondToCombineTime(time);
    if(!time){
        return <View></View>
    }
    return (
        <Pressable onPress={()=>{navigation.navigate("AddTask")}} style={{borderWidth:1, zIndex:2, padding:10, backgroundColor:"white"}}>
            <Text>
                {hour > 0 && (hour > 10 ? hour : "0" + hour) + ":"}
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
            </Text>
        </Pressable>
    );
}
