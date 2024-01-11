import { Text, Pressable } from "react-native";
import React from "react";
import moment from "moment";


interface Props{
	currentDate:string,
	setOpenModal:(open:boolean)=>void
}

function getFirstCapitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
}

export default function HeaderComponent({ setOpenModal, currentDate }:Props) {
    return (
        <Pressable
            style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: 5,
            }}
            onPress={() => setOpenModal(true)}>
            <Text
                style={{
                    fontSize: 20,
                    backgroundColor: "#dafffd",
                    borderWidth: 1,
                    borderColor: "#a0f7ff",
                    paddingHorizontal: 35,
                    paddingVertical: 5,
                }}>
                {getFirstCapitalize(moment(currentDate).format("MMMM yyyy"))}
            </Text>
        </Pressable>
    );
}
