import "react-native-get-random-values";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { AppNavigator } from "./src/routes";
import { Provider } from "react-redux";
import store from "@store/index";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import moment from "moment";
import "./ignoreWarnings";
import { TimerProvider } from "src/TimerContext";
import { SavedDataProvider } from "@src/SavedDataContext";
// import { fetch } from "@react-native-community/netinfo";

moment().locale("ru");

export default function App() {
    const [installStatus, setInstalStatus] = useState(0);
    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync();
            let confirmUpdate = false;
            if (update.isAvailable) {
                Alert.alert(
                    "",
                    "Установить обновление?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => (confirmUpdate = false),
                            style: "cancel",
                        },
                        { text: "OK", onPress: () => (confirmUpdate = true) },
                    ],
                    { cancelable: false }
                );
                if (confirmUpdate) {
                    setInstalStatus(1)
                    await Updates.fetchUpdateAsync().then((result) => {
                        if(result.isNew)setInstalStatus(2)
                    }).then(()=>{
                        Updates.reloadAsync();
                    }).finally(()=>{
                        setInstalStatus(0)
                    })
                    
                }
            }
        } catch (error) {
            Alert.alert(`Обновление не было установлено по причине: ${error}`);
            setInstalStatus(0)
        }
    }
    useEffect(() => {
        if (!__DEV__) {
            // fetch().then((state) => {
            //     if (state.isConnected) onFetchUpdateAsync();
            // });
            onFetchUpdateAsync();
        }
    }, []);
    if (installStatus) {
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
                        {installStatus===1?"Идет скачивание обновления":"Обновление скачено, установка обноления"}
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
