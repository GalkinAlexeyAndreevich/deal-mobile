import { View,Image } from "react-native";
import React from "react";

export default function Header() {
    return (
        <View style={{height:130, paddingTop:20}}>
            <Image
                source={require("@assets/deal3.png")}
                style={{ width: 200, height:90 }}
            />
        </View>
    );
}
