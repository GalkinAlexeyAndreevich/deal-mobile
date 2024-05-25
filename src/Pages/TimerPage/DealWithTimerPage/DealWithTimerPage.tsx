import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { useAppSelector } from "@store/hook";
import Icon from "react-native-vector-icons/Ionicons";
import { useBackgroundTimer } from "@src/TimerContext";
import { useEffect } from "react";
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
    const { timerOn,setTimerOn, diff,setDiff } = useBackgroundTimer();
    const { nameTask } = useAppSelector((state) => state.dealSettings);
    const { hours, mins, seconds } = clockify(diff);
    const handlePause = () => {
        setTimerOn(prev=>!prev);
    };
    const handleStop = () => {
        setTimerOn(false);
        setDiff(0)
    };
    useEffect(()=>{
        if(diff === 0 && !timerOn){
            Vibration.vibrate(500)
        }
    },[timerOn,diff])
    // const time = diff==0?'00:00:00':`${moment.utc( diff*1000 ).format( 'hh:mm:ss' )}`;
    const time = `${hours > 0?(hours >= 10 ? hours:"0"+hours + ' :'):''}${mins >= 10 ? mins:"0"+mins} : ${seconds >= 10 ? seconds:"0"+seconds}`
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
                        
                    <Text style={{fontSize: 30, color: diff==0?"red":"black" }}>{time}</Text>
                    {diff === 0 && !timerOn && (
                        <Text style={{ fontSize: 30}}>
                            Время истекло
                        </Text>
                    )}
                </View>
            </View>
            {diff === 0 ? (
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
