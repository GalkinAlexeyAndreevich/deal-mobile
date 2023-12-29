import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { View, Text } from "react-native";
import { AppNavigator } from "./src/routes";
import { Provider } from "react-redux";
import store from "./src/store";
import * as Updates from "expo-updates"
import { useEffect } from 'react';
import moment from "moment";

moment().locale("ru");

export default function App() {
    async function onFetchUpdateAsync() {
        try {
          const update = await Updates.checkForUpdateAsync();
    
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        } catch (error) {
          // You can also add an alert() to see the error message in case of an error when fetching updates.
          alert(`Error fetching latest Expo update: ${error}`);
        }
      }
      useEffect(()=>{
        if (!__DEV__) {
          onFetchUpdateAsync();
        }
      },[])
    return (
        <Provider store={store}>
        <View
            style={{
                flex: 1,
                display: "flex",
            }}>
            <AppNavigator />
           
        </View>
        </Provider>

    );
}
