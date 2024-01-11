import { View, Text, FlatList, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { TypeDeal } from "@src/interfaces";
import { useAppSelector } from "@src/store/hook";

interface Props{
    selected:number
    setSelected:Dispatch<SetStateAction<number>>
}
const getTimeOnType = (type:TypeDeal)=>{
    let resultArr:number[] = []
    if(type === "Мелкая сделка"){
        for(let i=5;i<=20;i++){
            if(i%5==0)resultArr.push(i)
        }
    }
    else{
        for(let i=25;i<=120;i++){
            if(i%5==0)resultArr.push(i)
        }
    }
    return resultArr
}
export default function MinutePicker({selected, setSelected}:Props) {
    const typeDeal = useAppSelector(state=>state.dealSettings.typeDeal)
    const arrMinutes = getTimeOnType(typeDeal)
    const MinuteItem = ({ item }:{item:number}) => {
        return (
            <Pressable onPress={() => setSelected(item)}>
                <Text
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#8ffb93",
                        fontSize: 20,
                        padding: 10,
                        marginHorizontal: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: item === selected ? "bold" : "normal",
                    }}>
                    {item}
                </Text>
            </Pressable>
        );
    };
    return (
        <View style={{ paddingHorizontal: 10, height: 50, width: "100%" }}>
            <FlatList
                data={arrMinutes}
                keyExtractor={(_, index) => String(index)}
                renderItem={MinuteItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}
