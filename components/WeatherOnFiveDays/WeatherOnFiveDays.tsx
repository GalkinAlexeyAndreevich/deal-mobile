import React, { useState, useEffect } from "react";
import {View, StyleSheet,ActivityIndicator } from "react-native";

import { getWeatherOnFiveDays } from "../../api/getWeather";

import { IDailyForecasts } from "../../interfaces";
import WeatherItem from "./WeatherItem";
import {baseWeatherDataOnFiveDays} from "../../config/dataForNoFetch"
import { useAppSelector } from "../../store/hook";
import useGetWeatherOnFiveDays from "../../api/react-query/useGetWeatherOnFiveDays";
import Loading from "../Loading";

export default function WeatherOnFiveDays() {

	// const [weather, setWeather] = useState<IDailyForecasts[]>(baseWeatherDataOnFiveDays);
	const codeCity = useAppSelector(state=>state.city.Key)
	const {data:weather,isSuccess,isFetching} = useGetWeatherOnFiveDays(codeCity)
	// useEffect(() => {
	// 	(async () => {
	// 		const weather = await getWeatherOnFiveDays(codeCity);
    //         console.log(weather);
	// 		if(!weather)return
	// 		setWeather(weather);
	// 	})();
	// }, [codeCity]);

	if (isFetching) {
		return <ActivityIndicator />
	}

	return (
		<View style={styles.container}>
			{isSuccess && weather?.map((item: IDailyForecasts, index: number) => {
				return <WeatherItem key={index} weatherItem={item} />;
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// width:350,
		// flex: 3,
		display: "flex",
		// justifyContent: "center",
		alignItems: "center",
	},
	paragraph: {
		fontSize: 5,
	},
});
