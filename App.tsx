import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { StyleSheet, View,ScrollView} from "react-native";
import { AppNavigator } from "./routes/routes";
import { ThemeProvider, useTheme } from "./store/ThemeContext";
import { Provider } from "react-redux";
import store from "./store";


export default function App() {
    return (
        <Provider store={store}>
        <ThemeProvider >
           {/* <ScrollView horizontal={false} alwaysBounceVertical={false}> */}
           <View style={{
                    flex: 1,
                    display: "flex",
            }}>
                <AppNavigator />
            </View>
           {/* </ScrollView> */}

        </ThemeProvider>
        </Provider>

    );
}

