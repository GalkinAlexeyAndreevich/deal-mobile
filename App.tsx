import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { View, Text } from "react-native";
import { AppNavigator } from "./src/routes/routes";
import { Provider } from "react-redux";
import store from "./src/store";

export default function App() {
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
