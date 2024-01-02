import { View, Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '@store/hook'
import Timer from '../Timer'


const secondToCombineTime = (minutes:number)=>{
	return {
		minutes:minutes,
		seconds:0
	}
}

export default function DealSettingModal() {
	const {nameTask,time} = useAppSelector(state=>state.dealSettings)


	return (
		<View style={{display:"flex"}}>
			<Text>{nameTask}</Text>
			<Timer time={secondToCombineTime(time)}/>
		</View>
	)
}