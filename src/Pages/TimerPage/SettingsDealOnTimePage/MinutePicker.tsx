import { View, Text, FlatList, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { getArrMinutes } from "@utils/dataNoFetch";

interface Props{
    selected:number
    setSelected:Dispatch<SetStateAction<number>>
}

export default function MinutePicker({selected, setSelected}:Props) {
    const arrMinutes = getArrMinutes();
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
