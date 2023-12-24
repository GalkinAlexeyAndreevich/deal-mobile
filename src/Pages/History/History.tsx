import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import axios from "axios";
interface User {
    id: number;
    name: string;
}
export default function History() {
    const [data, setData] = useState<User[]>([]);
    useEffect(() => {
        (async () => {
            axios
                .get("https://jsonplaceholder.typicode.com/users")
                .then((data) => {
                    setData(data.data);
                });
        })();
    }, []);
    return (
        <View>
            <Text> Основная страница</Text>
            <View>
                {data.length ? (
                    data.map((user) => (
                        <View key={user.id}>
                            <Text>{user.name}</Text>
                        </View>
                    ))
                ) : (
                    <ActivityIndicator />
                )}
            </View>
        </View>
    );
}
