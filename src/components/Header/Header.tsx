import { View,Image } from "react-native";
import React from "react";

export default function Header() {
    return (
        <View>
            <Image
                source={require("@assets/deal3.png")}
                style={{ width: 185, height:85 }}
            />
        </View>
    );
}
