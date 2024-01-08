import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { useAppDispatch, useAppSelector } from "@store/hook";
import Timer from "@components/Timer";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { setTime } from "@store/dealSettings";
type TProps = NativeStackScreenProps<AddTaskParamList>;

const secondToCombineTime = (time: number) => {
    return {
        hour: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
    };
};

export default function DealWithTimerPage({ navigation }: TProps) {
    const { nameTask, time } = useAppSelector((state) => state.dealSettings);
    const dispatch = useAppDispatch();
    const { hour, minutes, seconds } = secondToCombineTime(time);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        let timerID: ReturnType<typeof setInterval>;
        if (status === 1 && time>0) {
            timerID = setInterval(() => {
                dispatch(setTime(time - 1000));
            }, 1000);
        } else {
            clearInterval(timerID);
            if (status === -1) dispatch(setTime(0));
        }
        if(time===0){
            navigation.navigate("TypeDealPage")
            setStatus(-1)
        }
        return () => {
            clearInterval(timerID);
        };
    }, [status, time]);

    const handlePause = () => {
        setStatus((prev) => (prev === 0 ? 1 : 0));
    };
    const handleStop = () => {
        setStatus(-1);
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
                <View style={{
                    display: "flex", 
                    alignItems: "center",
                    borderWidth: 1 ,
                    paddingVertical: 20,
                    paddingHorizontal: 30,
                }}>
                    <Text style={{ fontSize: 30 }}>
                        {hour >0 && (hour > 10 ?hour : "0" + hour) + ":"}
                        {minutes < 10 ? "0" + minutes : minutes}:
                        {seconds < 10 ? "0" + seconds : seconds}
                    </Text>
                    {time === 0 && (
                        <Text style={{ fontSize: 30, color: "red" }}>
                            Время вышло
                        </Text>
                    )}
                </View>
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
                <Pressable onPress={handlePause}>
                    <Icon name="pause-circle-outline" size={140} />
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
