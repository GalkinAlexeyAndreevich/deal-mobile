import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Fontisto from "react-native-vector-icons/Fontisto";
import { setTime } from "@store/dealSettings";
const secondToCombineTime = (time: number) => {
    return {
        hour: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
    };
};


function getMinMaxTime(typeDeal:string):{minTime:number, maxTime:number}{
	let minTime= 1000 * 60
	let maxTime= 1000 * 60
	if(typeDeal == "Крупная сделка"){
		minTime = 1000 * 60 * 21
		maxTime = 1000 * 60 * 60 * 2
	}
	else if(typeDeal == "Мелкая сделка"){
		minTime = 1000 * 60
		maxTime = 1000 * 60 * 20
	}
	return {minTime,maxTime}
}

export default function TimePicker() {
    const { typeDeal, time } = useAppSelector((state) => state.dealSettings);
    const { hour, minutes } = secondToCombineTime(time);
	const {minTime, maxTime} = getMinMaxTime(typeDeal)
    const dispatch = useAppDispatch();

		const plus = (isMinutes:boolean)=>{
			if(isMinutes){
				console.log(time + 1000*60, maxTime);
				
				if(time + 1000*60 <=maxTime)dispatch(setTime(time + 1000*60))
			}
			if(!isMinutes){
				if(time + 1000*60*60 <=maxTime)dispatch(setTime(time + 1000*60*60))
			}
		}

		const minus = (isMinutes:boolean)=>{
			if(isMinutes){
				if(time - 1000*60 >=minTime)dispatch(setTime(time - 1000*60))
			}
			if(!isMinutes){
				if(time - 1000*60*60 >=minTime)dispatch(setTime(time - 1000*60*60))
			}
		}

    return (
        <View>
            <Text style={{ fontSize: 25 }}>Выберите время</Text>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                {typeDeal == "Крупная сделка" && (
                    <View style={{display: "flex", flexDirection: "column",justifyContent:"center", alignItems:"center"} }>
                        <Text style={{fontSize:30}}>Часы</Text>
                        <View style={styles.row}>
                            <Pressable onPress={()=>{plus(false)}}>
                                <Fontisto name="plus-a" size={20} />
                            </Pressable>
                            <Text style={{ width: 30, textAlign:"center", fontSize:20  }}>{hour}</Text>
                            <Pressable onPress={()=>{minus(false)}}>
                                <Fontisto name="minus-a" size={20} />
                            </Pressable>
                        </View>
                    </View>
                )}
                    <View style={{display: "flex", flexDirection: "column",alignItems:"center"}}>
                        <Text style={{fontSize:30}}>Минуты</Text>
                        <View style={styles.row}>
                            <Pressable onPress={()=>{plus(true)}}>
                                <Fontisto name="plus-a" size={20} />
                            </Pressable>
                            <Text style={{ width: 30, textAlign:"center", fontSize:20 }}>{minutes}</Text>
                            <Pressable onPress={()=>{minus(true)}}>
                                <Fontisto name="minus-a" size={20} />
                            </Pressable>
                        </View>
                    </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 40,
        alignItems: "center",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
