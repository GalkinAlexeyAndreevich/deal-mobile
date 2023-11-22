import { View, Text, Alert } from 'react-native'
import React, { useState,useEffect } from 'react'

interface IProps{
	time:{
		seconds:number,
		minutes:number
	},
	fontSize?:number
}

export default function Timer({time, fontSize}:IProps) {
	const [seconds,setSeconds] = useState(time.seconds)
	const [minutes,setMinutes] = useState(time.minutes)
	let timer:ReturnType<typeof setInterval>
	useEffect(()=>{
		timer=setInterval(()=>{
			if(minutes===0 && seconds===0){
				console.log("check");
				
				clearInterval(timer)
				Alert.alert("Время вышло")
				return
			}
			if(seconds ===0){
				setMinutes(minutes-1)
				setSeconds(59)
			}else{
				setSeconds(seconds-1)
			}
			
		},1000)
		return ()=>clearInterval(timer)
	})
	console.log(minutes,seconds);
	
	return (
		<View>
			<Text style={{fontSize}}>{minutes<10?'0'+ minutes:minutes}:{seconds<10?'0'+ seconds:seconds}</Text>
			{minutes===0 && seconds===0 && <Text style={{fontSize}}>Время вышло</Text>}
		</View>
	)
}