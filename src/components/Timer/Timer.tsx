import { View, Text, Alert } from 'react-native'
import React, { useState,useEffect, useRef } from 'react'

interface IProps{
	time:{
		seconds:number,
		minutes:number
	},
	fontSize?:number,
	width?:number,
	height?:number
	status:-1|0|1 // -1 сбросить, 0 пауза 1
}

export default function Timer({time, fontSize=15,width=80,height=40,status }:IProps) {
	const [seconds,setSeconds] = useState(time.seconds)
	const [minutes,setMinutes] = useState(time.minutes)
	let timerRef = useRef<ReturnType<typeof setInterval>>()

  function handleCancelClick() {
    clearInterval(timerRef.current);
  }
	// let timer:ReturnType<typeof setInterval>
	useEffect(()=>{
		const timer=setInterval(()=>{
			if(minutes===0 && seconds===0){
				console.log("check");
				clearInterval(timerRef.current)
				return
			}
			if(seconds ===0){
				setMinutes(minutes-1)
				setSeconds(59)
			}else{
				setSeconds(seconds-1)
			}	
		},1000)
		timerRef.current = timer
		return ()=>clearInterval(timerRef.current)
	},[])
	console.log(minutes,seconds);
	
	return (
		<View style={{display:"flex", borderWidth:1, width, height, justifyContent:"center", alignItems:'center'}}>
			<Text style={{fontSize}}>{minutes<10?'0'+ minutes:minutes}:{seconds<10?'0'+ seconds:seconds}</Text>
			{minutes===0 && seconds===0 && <Text style={{fontSize, color:"red"}}>Время вышло</Text>}
		</View>
	)
}