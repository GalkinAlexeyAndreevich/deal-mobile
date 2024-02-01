import "react-native-get-random-values";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { AppNavigator } from "./src/routes";
import { Provider } from "react-redux";
import store from "@store/index";
import * as Updates from "expo-updates";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./ignoreWarnings";
import { TimerProvider } from "src/TimerContext";
import { SavedDataProvider } from "@src/SavedDataContext";
import { fetch } from "@react-native-community/netinfo";
import AlertAsync from "react-native-alert-async";

moment().locale("ru");

export default function App() {
    const check1 = useRef(0)
    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                const confirmUpdate =  await AlertAsync(
                    "",
                    "Установить обновление?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => false,
                            style: "cancel",
                        },
                        { text: "OK", onPress: () => true},
                    ],
                    { cancelable: false }
                );
                
                if (confirmUpdate) {
                    check1.current = 1
                    // await AlertAsync(`соглашение на обновление: ${installStatus} и ${check1.current}`);
                    
                    await Updates.fetchUpdateAsync().then(async(result) => {
                        if(result.isNew){
                            check1.current = 2
                        }
                        // await AlertAsync(`Обновление скачено, статус: ${installStatus}`);
                    }).then(()=>{
                        Updates.reloadAsync().then(async()=>{
                            check1.current = 0
                            await AlertAsync('Вы успешно установили обновление');
                        });
                       
                    })
                    
                }
            }
        } catch (error) {
            Alert.alert("Обновление не было установлено по причине: ",`${error}`);
            check1.current = 0
        }
    }
    useEffect(() => {
        if (!__DEV__) {
            new Promise(async() => {
                fetch().then(async(state) => {                    
                    if (state.isConnected) await onFetchUpdateAsync();
                })
            })
              

            // onFetchUpdateAsync();
        }
    }, []);
    if (check1.current > 0) {
        return (
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent:"center",
                    alignItems:'center',
                    backgroundColor:"white"
                }}>
                    <ActivityIndicator size={"large"} />
                    <Text style={{paddingBottom:10, fontSize:20}}>
                        {check1.current ===1?"Идет скачивание обновления":"Обновление скачено, установка обноления"}
                    </Text>
            </View>
        );
    }
    return (
        <Provider store={store}>
            <TimerProvider>
                <SavedDataProvider>
                    <View
                        style={{
                            flex: 1,
                            display: "flex",
                        }}>
                        <AppNavigator />
                    </View>
                </SavedDataProvider>
            </TimerProvider>
        </Provider>
    );
}
