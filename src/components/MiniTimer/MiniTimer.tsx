import { View, Text, Pressable } from "react-native";
import React from "react";
import {  useBackgroundTimer } from "@src/TimerContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/routes/TabNavigator";
import moment from "moment";

interface IPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList,'TaskOnDayPage' | 'CalendarPage'>;
 }

// const clockify = (secondsLeft:number) => {
//     let hours = Math.floor(secondsLeft / 60 / 60)
//     let mins = Math.floor((secondsLeft / 60) % 60)
//     let seconds = Math.floor(secondsLeft % 60)
//     return {
//         hours,
//         mins,
//         seconds,
//     }
// }

export default function MiniTimer({navigation}:IPageProps) {
    const {diff} = useBackgroundTimer()
    // const {hours, mins, seconds} = clockify(diff)
    const time = `${ moment.utc( diff*1000 ).format( 'mm:ss' )}`;
    if(!diff){
        return <View></View>
    }
    return (
        <Pressable onPress={()=>{navigation.navigate("AddTask")}} style={{borderWidth:1, zIndex:2, padding:10, backgroundColor:"white"}}>
            <Text style={{fontSize:17}}>
            {time}
            </Text>
        </Pressable>
    );
}
