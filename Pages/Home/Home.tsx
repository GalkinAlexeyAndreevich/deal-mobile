import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { RootStackParamList } from "../../routes/routes";
type TProps = NativeStackScreenProps<RootStackParamList>
export default function Home({navigation}:TProps) {
    const foundAlly = ()=>{
        navigation.navigate("TestPage1");
    }
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                backgroundColor:"white"
            }}>
            <View style={{ marginTop: 20 }}>
                <Image
                    style={{ width: 300, height: 160 }}
                    source={require("../../assets/deal.jpg")}
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
                    style={{ width: 300, height: 140 }}
                    source={require("../../assets/handshake.jpg")}
                />
                <Pressable style={styles.button} onPress={foundAlly}>
                    <Text style={{
                        textAlign:"center",
                    }}>Найти союзника</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={{
                        textAlign:"center",
                    }}>Стать союзником</Text>
                </Pressable>
            </View>
            <View>
                <Text style={{ width: 300, paddingTop:20 }}>
                    Deal - это сайт, который поможет вам в борьбе с
                    прокрастинацией.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        display:"flex",
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        fontSize: 15,
        width: 200,
        justifyContent:"center",
        
        backgroundColor: "white",
    },
});
