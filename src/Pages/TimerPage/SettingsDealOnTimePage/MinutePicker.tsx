import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getArrMinutes } from "@utils/dataNoFetch";
import { useAppDispatch } from "@store/hook";
import { setTime } from "@store/dealSettings";

export default function MinutePicker() {
    const arrMinutes = getArrMinutes();
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState(arrMinutes[0]);
		console.log("render");
		
		useEffect(()=>{
			dispatch(setTime(selected * 60 * 1000));
			console.log("test render1");
		},[selected])
		useEffect(()=>{
			dispatch(setTime(selected * 60 * 1000));
			console.log("test render");
			
		},[])
    const MinuteItem = ({ item }) => {
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
