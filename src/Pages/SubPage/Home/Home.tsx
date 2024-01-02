import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { Button } from "react-native-elements";
type TProps = NativeStackScreenProps<AddTaskParamList>;
export default function Home({ navigation }: TProps) {
    const foundAlly = () => {
        navigation.navigate("TypeDealPage");
    };
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                backgroundColor: "white",
            }}>
            <Image
                style={{ width: 300, height: 140 }}
                source={require("@assets/handshake.jpg")}
            />
            <View>
                <Text style={{ width: 300, paddingTop: 20 }}>
                    Deal - это приложение, который поможет вам в борьбе с
                    прокрастинацией.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        fontSize: 15,
        width: 200,
        justifyContent: "center",

        backgroundColor: "white",
    },
});
