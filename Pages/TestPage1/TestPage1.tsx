import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../../routes/routes";

type TProps = NativeStackScreenProps<RootStackParamList>;

export default function TestPage({ navigation }: TProps) {
    const loadPage = () => {
        navigation.navigate("TestPage2");
    };
    const loadPageHome = () => {
        navigation.navigate("HomePage");
    };
    const loadPageMain = () => {
        navigation.navigate("MainPage");
    };
    return (
        <View style={{ marginTop: 50 }}>
            <Text>Я тестовая страница 1</Text>
            <Pressable onPress={loadPage}>
                <Text>Tестовая страница 2</Text>
            </Pressable>
            <Pressable onPress={loadPageHome}>
                <Text>Начальная страница</Text>
            </Pressable>
            <Pressable onPress={loadPageMain}>
                <Text>Основная страница</Text>
            </Pressable>
        </View>
    );
}
