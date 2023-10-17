import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState,useEffect} from "react";
import { useAppDispatch } from "../../store/hook";
import { getCityDataOnName } from "../../api/getWeather";
import {  setChosenPlace, setSearchBy } from "../../store/citySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetCityDataOnName from "../../api/react-query/useGetCityOnName";

export default function SearchCityPage() {
    const inputAccessoryViewID = "uniqueID";
    const initialText = "";
    const [text, setText] = useState(initialText);
    const [enabled,setEnabled] = useState(false)
    const dispatch = useAppDispatch()
    const {data,isSuccess} = useGetCityDataOnName(text,enabled)
    console.log(data,isSuccess);
    
    const handleChangeCity = async() => {
        console.log(text);
        setEnabled(true)
        console.log(enabled);
        
        // const data = await getCityDataOnName(text)
   
    };
    useEffect(()=>{
        if(data && isSuccess){
            const {Key, EnglishName,LocalizedName} = data[0]
            dispatch(setChosenPlace({Key, EnglishName,LocalizedName}))
            dispatch(setSearchBy("nameCity"))
            AsyncStorage.setItem('citySettings',JSON.stringify({
                searchBy:"nameCity",
                Key:Key
            }))
            setEnabled(false)
            setText(initialText)
        }  
    },[data])
    return (
        <View>
            <Text>SearchCityPage</Text>
            <View style={styles.row}>
                <ScrollView keyboardDismissMode="interactive">
                    <TextInput
                        inputAccessoryViewID={inputAccessoryViewID}
                        onChangeText={setText}
                        value={text}
                        placeholder={"Введите место"}
                    />
                </ScrollView>
                <Pressable onPress={() => setText(initialText)}>
                    <AntDesign name="close" size={24} color="black" />
                </Pressable>
                <Pressable onPress={handleChangeCity}>
                    <AntDesign name="search1" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row:{
        display:"flex",
        flexDirection:"row",
        marginTop:10,
        padding:5
    }
});
