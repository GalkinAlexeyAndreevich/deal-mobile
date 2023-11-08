import React from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
export default function Home() {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
            }}>
            <View style={{ marginTop: 20 }}>
                <Image
                    style={{ width: 300, height: 180 }}
                    source={require("../../assets/deal1.jpg")}
                />
            </View>
            <View
                style={{
                    paddingTop: 50,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 20,
                }}>
                <Image
                    style={{ width: 300, height: 180 }}
                    source={require("../../assets/handshake.jpg")}
                />
                <Pressable style={styles.button}>
                    <Text>Найти союзника</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text>Стать союзником</Text>
                </Pressable>
            </View>
            <View>
                <Text style={{ width: 300 }}>
                    Deal - это сайт, который поможет вам в борьбе с
                    прокрастинацией.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        fontSize: 15,
        width: 200,
        /* margin-top: 10px; */
        backgroundColor: "white",
    },
});
