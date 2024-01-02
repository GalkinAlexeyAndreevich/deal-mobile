import { View, Text, Image } from "react-native";
import React from "react";

export default function Header() {
    return (
        <View>
            <Image
                source={require("@assets/deal.jpg")}
                style={{ width: 200, height:80 }}
            />
        </View>
    );
}
