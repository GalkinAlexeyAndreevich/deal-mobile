import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { ICoordination, IDataCity, searchBy } from "../interfaces";
import { getCityDataOnCoordination } from "../api/getWeather";
import useGetCityDataOnCoordination from "../api/react-query/useGetCityOnCoordination";
import { useAppSelector } from "../store/hook";
type TLocation = Location.LocationObject | undefined;
export const useLocation = () => {
	const { searchBy } = useAppSelector((state) => state.city); 
	let check = searchBy ==="currentPlace"
	const [coordination,setCoordination] = useState<ICoordination>({
		latitude:0,
		longitude:0
	})
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [isLoading,setIsLoading] = useState(false)
	// const [cityData, setCityData] = useState<IDataCity>({
	// 	Key: "",
	// 	LocalizedName: "",
	// 	EnglishName:""
	// });
	const [granted,setGranted] = useState(false)
	console.log(coordination,granted,check);
	
	// let enabled = coordination.latitude !==0 && granted && check
	// const { data, isLoading, isSuccess } = useGetCityDataOnCoordination(coordination,enabled);


	useEffect(() => {
		setIsLoading(false)
		if(!check)return
		(async () => {
			
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== "granted") {
				setErrorMsg("Вы не разрешили узнать ваше местоположение");
				return;
			}
			setGranted(true)
		})();
	}, [check]);

	useEffect(() => {
		if(!granted)return
		(async () => {
			try{
				console.log("test");
				let location: TLocation = await Location.getCurrentPositionAsync({});
				setCoordination(location.coords)
				setIsLoading(true)
			}catch(e){
				setErrorMsg("Вы не разрешили узнать ваше местоположение");
				setGranted(false)
			}

		})();
	}, [granted]);


	return { coordination, errorMsg,isLoading };
};
