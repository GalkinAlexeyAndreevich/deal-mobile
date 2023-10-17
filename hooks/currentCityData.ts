import { useEffect, useState } from "react";
import { setChosenPlace, setKey, setSearchBy } from "../store/citySlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useLocation } from "./Location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCityOnCode } from "../api/getWeather";
import useGetCityDataOnCoordination from "../api/react-query/useGetCityOnCoordination";
import useGetCityDataOnCode from "../api/react-query/useGetCityOnCode";

export const useCurrentCityData = () => {
  const [result, setResult] = useState(false)
  const {searchBy,Key:key} = useAppSelector(state=>state.city)

  const { coordination,isLoading,errorMsg } = useLocation()
  let enabledCoordination = isLoading && searchBy === "currentPlace"
  let {data:dataOnCoordination,isSuccess:successOnCoordination} = useGetCityDataOnCoordination(coordination,enabledCoordination)
  let enabledCode = searchBy === "nameCity"
  let {data:dataOnKey,isSuccess:successOnKey} = useGetCityDataOnCode(key,enabledCode)
  console.log(enabledCoordination,enabledCode);
  

  console.log(dataOnCoordination);
  console.log(searchBy,key);
  
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("get from local");
    
    const getFromLocal = async () => {
      const value = await AsyncStorage.getItem('citySettings')
      const parseData = value && JSON.parse(value)
      if (!parseData||(parseData && !parseData.searchBy)) {
        let clearLocal = {
          searchBy: "currentPlace",
          Key: ""
        }
        AsyncStorage.setItem('citySettings', JSON.stringify(clearLocal))
        dispatch(setSearchBy(clearLocal.searchBy))
        return
      }
      dispatch(setKey(parseData.Key))
      dispatch(setSearchBy(parseData.searchBy))
    }
    getFromLocal()
  }, [])

  useEffect(()=>{
    if(!dataOnCoordination || !successOnCoordination)return
    dataOnCoordination && dispatch(setChosenPlace(dataOnCoordination));
    setResult(true)
    console.log(dataOnCoordination);
    dataOnCoordination = undefined
    console.log("dispatch current");
  },[dataOnCoordination])

  useEffect(()=>{
    if(!dataOnKey || !successOnKey)return
    const { Key, EnglishName, LocalizedName } = dataOnKey
    dataOnKey && dispatch(setChosenPlace({ Key, EnglishName, LocalizedName }));
    setResult(true)
    console.log("dispatch on key");
    dataOnKey = undefined
  },[dataOnKey])




  // useEffect(() => {
  //   const getCitySettings = async () => {
  //     try {
  //       console.log(searchBy,key);
        
  //       if (searchBy === "nameCity" && key) {

  //         const cityOnName = await getCityOnCode(key)
  //         if (!cityOnName) return
  //         const { Key, EnglishName, LocalizedName } = cityOnName
  //         cityOnName && dispatch(setChosenPlace({ Key, EnglishName, LocalizedName }));
  //         setResult(true)
  //         console.log("dispatch on name");

  //       } else if (searchBy == "currentPlace") {
  //         dataOnCoordination && dispatch(setChosenPlace(dataOnCoordination));
  //         setResult(true)
  //         console.log("dispatch current");
  //       }
  //     } catch (error) {
  //       console.log('Error loading city info:', error);
  //     }
  //   };
  //   getCitySettings();
    
  // }, [searchBy,key]);
  return result
}
