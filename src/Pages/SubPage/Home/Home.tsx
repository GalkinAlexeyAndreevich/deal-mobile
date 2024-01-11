import React from "react";
import { View, Image, Text } from "react-native";
export default function Home() {
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
