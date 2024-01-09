import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    DrawerContentScrollView,
    createDrawerNavigator,
    useDrawerStatus,
} from "@react-navigation/drawer";
import { Platform, Pressable, Text, View } from "react-native";
import Header from "@components/Header";
import About from "@Pages/SubPage/About";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";
import { Button } from "@rneui/base";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
export type MainStack = {
	About: undefined;
	TabNavigator: undefined;
};
const Drawer = createDrawerNavigator();
const MainStack = createNativeStackNavigator<MainStack>();

function DrawerView( { navigation }:{navigation:DrawerNavigationHelpers} ) {
    let isOpen = useDrawerStatus();
    return (
        <DrawerContentScrollView>
            {isOpen ? (
                <View>
                    <Text style={{ marginBottom: 20, textAlign: "center" }}>
                        Настройки
                    </Text>
                    <View style={{ display: "flex", gap: 10 }}>
                        <Button onPress={() => navigation.navigate("About")}>
                            About
                        </Button>
                        <Button
                            onPress={() => navigation.navigate("TabNavigator")}>
                            Основное приложение
                        </Button>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
        </DrawerContentScrollView>
    );
}

export function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerView {...props}/>}
            initialRouteName="TabNavigator"
            screenOptions={({ navigation }) => ({
                
                headerRight: () => (
                    <Pressable onPress={() => navigation.openDrawer()}>
                        <Ionicons
                            name={
                                Platform.OS === "android"
                                    ? "md-menu"
                                    : "ios-menu"
                            }
                            size={32}
                            color={"#000"}
                            style={{ marginRight: 10 }}
                        />
                    </Pressable>
                ),
                headerStyle: {
                    height: 120,
                    borderWidth:0
                },
                headerTitle: () => <Header />,
                drawerStyle: {
                    width: "50%",
                },
                headerTitleAlign: "center",
                drawerPosition: "right",
                headerLeft: () => null,
            })}>
            <Drawer.Screen name="TabNavigator" component={TabNavigator} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    );
}