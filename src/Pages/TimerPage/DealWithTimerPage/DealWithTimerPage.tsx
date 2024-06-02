import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Platform,
    Pressable,
    StyleSheet,
    Text,
    Vibration,
    View,
} from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { useAppSelector } from "@store/hook";
import Icon from "react-native-vector-icons/Ionicons";
import { useBackgroundTimer } from "@src/TimerContext";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

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

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        priority: Notifications.AndroidNotificationPriority.MAX,
    }),
});
let notificationId = "";
export default function DealWithTimerPage({ navigation }: TProps) {
    const { timerOn, setTimerOn, diff, setDiff } = useBackgroundTimer();
    const { nameTask } = useAppSelector((state) => state.dealSettings);
    const { hours, mins, seconds } = clockify(diff);
    const [isLoad, setIdLoad] = useState(false)

    const handlePause = async () => {
        if(timerOn)await Notifications.cancelScheduledNotificationAsync(notificationId);
        else schedulePushNotification(diff)
        setTimerOn((prev) => !prev);
    };
    const handleStop = () => {
        setTimerOn(false);
        setDiff(0);
    };
    useEffect(() => {
        if (diff === 0 && !timerOn) {
            Vibration.vibrate([0, 250, 250, 250]);
        }
    }, [timerOn, diff]);
    useEffect(()=>{
        if(diff && !isLoad)setIdLoad(true)
    },[diff])
    async function schedulePushNotification(time:number) {
        console.log("Время до инициализации таймер",diff);
        if (Platform.OS == "android") {
            Notifications.setNotificationChannelAsync("one-channel", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }
        notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Время вышло",
                body: nameTask,
                vibrate: [0, 250, 250, 250],
                priority: Notifications.AndroidNotificationPriority.MAX,
            },
            trigger: {
                seconds: time,
                channelId: "one-channel",
            },
        });
    }

    useEffect(() => {
        if(!isLoad)return
        Notifications.cancelAllScheduledNotificationsAsync().then(()=>{
            schedulePushNotification(diff);
        });
    }, [isLoad]);

    useEffect(() => {
        setIdLoad(false)
        const subscription = Notifications.addNotificationReceivedListener(
            () => {
                console.log("Вызвали функцию21412");
            }
        );
        return () => {
            subscription.remove();
        };
    }, []);

    const time = `${
        hours > 0 ? (hours >= 10 ? hours : "0" + hours + " :") : ""
    }${mins >= 10 ? mins : "0" + mins} : ${
        seconds >= 10 ? seconds : "0" + seconds
    }`;
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
                    <Text
                        style={{
                            fontSize: 30,
                            color: diff == 0 ? "red" : "black",
                        }}>
                        {time}
                    </Text>
                    {diff === 0 && !timerOn && (
                        <Text style={{ fontSize: 30 }}>Время истекло</Text>
                    )}
                </View>
            </View>
            {diff === 0 ? (
                <Pressable
                    style={{
                        flex: 2,
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("TypeDealPage")}>
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
                        {timerOn && (
                            <Icon name="pause-circle-outline" size={140} />
                        )}
                        {!timerOn && (
                            <Icon name="play-circle-outline" size={140} />
                        )}
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
