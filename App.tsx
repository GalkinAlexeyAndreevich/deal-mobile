import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { View,Text } from "react-native";
import { AppNavigator } from "./routes/routes";

export default function App() {
    return (
        <View
            style={{
                flex: 1,
                display: "flex",
            }}>
            <AppNavigator />
        </View>
    );
}
