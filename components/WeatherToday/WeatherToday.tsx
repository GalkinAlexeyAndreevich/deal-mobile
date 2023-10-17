import {
    StyleSheet,
    View,
    ScrollView,
    useWindowDimensions,
    ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { IAdditionInfo, IWeatherNow } from "../../interfaces";
import { baseAdditionInfo, baseWeatherNow } from "../../config/dataForNoFetch";
import WeatherNow from "../WeatherNow";
import AdditionWeatherInfoNow from "../AdditionWeatherInfoNow";
import WeatherOnTwelveHour from "../WeatherOnTwelveHour";
import { useAppSelector } from "../../store/hook";
import { getWeatherNow } from "../../api/getWeather";
import useGetWeatherNow from "../../api/react-query/useGetWeatherNow";
import Loading from "../Loading";

export default function WeatherToday() {
    const codeCity = useAppSelector((state) => state.city.Key);
    const [weatherNow, setWeatherNow] = useState<IWeatherNow>(baseWeatherNow);
    const [additionInfo, setAdditionInfo] =
        useState<IAdditionInfo>(baseAdditionInfo);
    const { height, width, scale, fontScale } = useWindowDimensions();
    const { data, isSuccess, isFetching } = useGetWeatherNow(codeCity);
    // useEffect(() => {
    //     (async () => {
    //         if (!Key) return;
    //         const weather = await getWeatherNow(Key);
    //         console.log(weather);
    //         if (!weather) return;
    //         const {
    //             WeatherIcon,
    //             Temperature,
    //             WeatherText,
    //             Wind,
    //             Pressure,
    //             RelativeHumidity,
    //         } = weather;
    //         setWeatherNow({ WeatherIcon, Temperature, WeatherText });
    //         setAdditionInfo({ Wind, Pressure, RelativeHumidity });
    //     })();
    // }, [Key]);
    useEffect(() => {
        if(!data || !isSuccess)return
        const {
            WeatherIcon,
            Temperature,
            WeatherText,
            Wind,
            Pressure,
            RelativeHumidity,
        } = data;
        setWeatherNow({ WeatherIcon, Temperature, WeatherText });
        setAdditionInfo({ Wind, Pressure, RelativeHumidity });
    }, [data]);
    if (isFetching) {
        return <ActivityIndicator />
    }

    return (
        <View style={[styles.container]}>
            {weatherNow && <WeatherNow weatherNow={weatherNow} />}
            <View style={[styles.row, { maxWidth: width - 10 }]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {additionInfo && (
                        <AdditionWeatherInfoNow additionInfo={additionInfo} />
                    )}
                    <WeatherOnTwelveHour />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        paddingLeft: 10,
        flexDirection: "column",
        //   backgroundColor:props.background
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        //   width:350
    },
});
