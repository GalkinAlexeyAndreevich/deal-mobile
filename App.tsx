import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { View, Text, Alert } from "react-native";
import { AppNavigator } from "./src/routes";
import { Provider } from "react-redux";
import store from "@store/index";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import moment from "moment";
import "./ignoreWarnings";
import { TimerProvider } from "src/TimerContext";
import { useAppSelector } from "@src/store/hook";
import { SavedDataProvider } from "@src/SavedDataContext";

moment().locale("ru");

export default function App() {
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
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            }
        } catch (error) {
            Alert.alert(`Обновление не было установлено по причине: ${error}`);
        }
    }
    useEffect(() => {
        if (!__DEV__) {
            onFetchUpdateAsync();
        }
    }, []);
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
