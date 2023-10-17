import { Pressable, ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
import WeatherOnFiveDays from "../../components/WeatherOnFiveDays";
import React, {  useEffect } from "react";
import {
    IColors,
} from "../../interfaces";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/routes";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../store/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import WeatherToday from "../../components/WeatherToday";
import { cityData } from "../../config/dataForNoFetch";
import { useCurrentCityData } from "../../hooks/currentCityData";




type TProps = NativeStackScreenProps<RootStackParamList, "WeatherPage">;

export default function WeatherPage({ navigation }: TProps) {
	const result = useCurrentCityData()
    console.log(result);
    
    const { LocalizedName } = useAppSelector((state) => state.city);
    const loadSettingsPage = () => {
        navigation.navigate("SettingsPage");
    };
    const { theme, colors } = useTheme();

    const styles = React.useMemo(() => getGlobalStyles(colors), [colors]);

    useEffect(() => {
        if(!LocalizedName)return
        navigation.setOptions({
            headerLeft: () => (
                <Pressable
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <Ionicons name="menu" size={24} color="black" />
                </Pressable>
            ),
            headerRight: () => (
                <Pressable onPress={loadSettingsPage}>
                    <Ionicons
                        style={styles.settings}
                        name="settings-outline"
                        size={24}
                        color="dark"
                    />
                </Pressable>
            ),

            title: LocalizedName,
            headerTitleAlign: "center",
        });
    }, [colors, LocalizedName]);
    if (!result) {
        return <ActivityIndicator />
    };
    return (
        <View style={styles.container}>
            <ScrollView
                alwaysBounceVertical={true}
                horizontal={false}
                showsVerticalScrollIndicator={false}>
                
				<WeatherToday />
                <WeatherOnFiveDays />
            </ScrollView>
        </View>
    );
}

const getGlobalStyles = (props: IColors) =>
    StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            flexDirection: "column",
            //   backgroundColor:props.background
        },
        paragraph: {
            fontSize: 20,
            //   color:props.text
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            //   width:350
        },
        weatherText: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: props.text,
        },
        settings: {
            // 	marginLeft: "auto",
            marginRight: 10,
            // 	marginTop: 50,
        },
    });
