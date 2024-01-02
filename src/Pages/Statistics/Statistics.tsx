import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import axios from "axios";
interface User {
    id: number;
    name: string;
}
export default function Statistics() {

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <Text>Здесь будет статистика</Text>
        </View>
    );
}
