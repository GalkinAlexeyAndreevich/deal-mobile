import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../../routes/routes";

type TProps = NativeStackScreenProps<RootStackParamList>;

export default function TestPage3({ navigation }: TProps) {
    const loadPage = () => {
        navigation.navigate("TestPage1");
    };
    return (
        <View style={{ marginTop: 50 }}>
            <Text>Я тестовая страница 3</Text>
            <Pressable onPress={loadPage}>
                <Text>Тестовая страница 1</Text>
            </Pressable>
        </View>
    );
}
