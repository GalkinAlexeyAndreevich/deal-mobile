import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { useAppSelector } from "@store/hook";
import Icon from "react-native-vector-icons/Ionicons";
import { useBackgroundTimer } from "@src/TimerContext";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertAsync from "react-native-alert-async";

type TProps = NativeStackScreenProps<AddTaskParamList>;

const clockify = (secondsLeft: number) => {
    secondsLeft = secondsLeft || 0
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
let notificationTextId = ""
export default function DealWithTimerPage({ navigation }: TProps) {
    let { beginTimer,timerOn, setTimerOn, diff, setDiff, setDifPause, setPausedBegin } = useBackgroundTimer();
    const { nameTask } = useAppSelector((state) => state.dealSettings);
    const { hours, mins, seconds } = clockify(diff);
    const [isLoad, setIsLoad] = useState(false)

    const responseListener = useRef<Notifications.Subscription | null>(null);
    console.log(diff);
    
    const handlePause = async () => {
        if(timerOn){
            await Notifications.cancelScheduledNotificationAsync(notificationId);
        }
        else{
            await Notifications.cancelAllScheduledNotificationsAsync()
            await schedulePushNotification(diff)
        } 
        setTimerOn((prev) => !prev);
    };
    const handleStop = () => {
        setTimerOn(false);
        setDiff(0);
        AsyncStorage.removeItem('timerInfo')
    };
    useEffect(()=>{
        if(diff && !isLoad)setIsLoad(true)

    },[diff])
    async function schedulePushNotification(time:number) {
        if(!diff || !nameTask.length)return
        console.log("Время до инициализации таймер",diff);
        if (Platform.OS == "android") {
            Notifications.setNotificationChannelAsync("one-channel", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [250, 250, 250, 250,250],
                lightColor: "#FF231F7C",
            });
        }
        // notificationTextId = await Notifications.scheduleNotificationAsync({
        //     content: {
        //         title: nameTask,
        //         body: `Вы поставили таймер на ${Math.round((diff + 1)/60)} минут.\nКонец таймера в ${moment().add(diff,'seconds').format('HH:mm')}`,
        //         data:{
        //             notificationPage:'DealWithTimerPage'
        //         },
        //         priority: Notifications.AndroidNotificationPriority.MAX,
                
        //     },
        //     trigger:null
        // });
        
        // setTimeout(() => {
        //     Notifications.dismissNotificationAsync(notificationTextId);
        // }, (diff-1) * 1000);
        notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: nameTask,
                body: `Время на выполнение задачи истекло`,
                data:{
                    notificationPage:'DealWithTimerPage'
                },
                vibrate: [250, 250, 250, 250,250],
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
        if(!diff || diff <=0){
            setIsLoad(false)
            return
        }
        Notifications.cancelAllScheduledNotificationsAsync().then(async()=>{
            console.log("Время перед загрузкой", diff);
            // AlertAsync('Время до установки таймера',`${diff}`)
            await schedulePushNotification(diff);
            // setTimeout(async()=>{
            //     await handlePause()
            //     setTimeout(async()=>{
            //         await handlePause()
            //     },500)
            // },1000)

        });
    }, [isLoad,nameTask]);

    useEffect(() => {
        setIsLoad(false)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data;
            if (data && data.notificationPage == 'DealWithTimerPage') {
              navigation.navigate('DealWithTimerPage');
            }
          });
        return () => {
            responseListener.current && Notifications.removeNotificationSubscription(responseListener.current)
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
                    {diff < 1 && (
                        <Text style={{ fontSize: 30 }}>Время вышло</Text>
                    )}
                </View>
            </View>
            {diff === 0 ? (
                <Pressable
                    style={{
                        flex: 2,
                        justifyContent: "center",
                    }}
                    onPress={async() => {
                        navigation.navigate("TypeDealPage")
                        AsyncStorage.removeItem('timerInfo')
                        setDifPause(0)
                        setPausedBegin("")
                        setIsLoad(false)
                        setDiff(0)
                        await Notifications.cancelScheduledNotificationAsync(notificationId);
                    }}>
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
