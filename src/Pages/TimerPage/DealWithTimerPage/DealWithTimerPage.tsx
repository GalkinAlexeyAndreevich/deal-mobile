import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Timer from "@components/Timer";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { setTime } from "@store/dealSettings";
import { useBackgroundTimer } from "@src/TimerContext";
type TProps = NativeStackScreenProps<AddTaskParamList>;

const clockify = (secondsLeft: number) => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    return {
        hours,
        mins,
        seconds,
    };
};

export default function DealWithTimerPage({ navigation }: TProps) {
    const { timerOn,setTimerOn, secondsLeft, setSecondsLeft } = useBackgroundTimer();
    const { nameTask } = useAppSelector((state) => state.dealSettings);
    const { hours, mins, seconds } = clockify(secondsLeft);
    const handlePause = () => {
        setTimerOn(prev=>!prev);
    };
    const handleStop = () => {
        setTimerOn(false);
        setSecondsLeft(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nameTask}</Text>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        borderWidth: 1,
                        paddingVertical: 20,
                        paddingHorizontal: 30,
                    }}>
                    <Text style={{ fontSize: 30 }}>
                        {hours > 0 && (hours > 10 ? hours : "0" + hours) + ":"}
                        {mins < 10 ? "0" + mins : mins}:
                        {seconds < 10 ? "0" + seconds : seconds}
                    </Text>
                    {secondsLeft === 0 && (
                        <Text style={{ fontSize: 30, color: "red" }}>
                            Время вышло
                        </Text>
                    )}
                </View>
            </View>
            {secondsLeft === 0 ? (
                <Pressable
                    style={{
                        flex: 2,
                        justifyContent: "center",
                    }}
                    onPress={()=>navigation.navigate("TypeDealPage")}
                    >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            borderWidth: 1,
                            marginTop: 30,
                        }}>
                        Выйти
                    </Text>
                </Pressable>
            ) : (
                <View style={{ flex: 2, justifyContent: "center" }}>
                    <Pressable onPress={handlePause}>
                    {timerOn && <Icon name="pause-circle-outline" size={140} />}
                    {!timerOn && <Icon name="play-circle-outline" size={140} />}
                    </Pressable>
                    <Pressable
                        style={{
                            borderWidth: 1,
                            marginTop: 30,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}
                        onPress={handleStop}>
                        <Text style={{ fontSize: 20, textAlign: "center" }}>
                            Сбросить
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 40,
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
