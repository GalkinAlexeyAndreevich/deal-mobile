import Home from "../Pages/Home";
import History from "../Pages/History";
import TypeDealPage from "../Pages/TypeDealPage";
import SettingsDealOnTimePage from "../Pages/SettingsDealOnTimePage";
import DealWithTimerPage from "../Pages/DealWithTimerPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    DrawerContentScrollView,
    createDrawerNavigator,
    useDrawerStatus,
} from "@react-navigation/drawer";
import TaskOnDayPage from "../Pages/TaskOnDayPage";
import CalendarPage from "../Pages/CalendarPage";
import { Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import About from "../Pages/About";
import { Button } from "@rneui/base";
import Ionicons from "react-native-vector-icons/Ionicons";

export type AddTaskParamList = {
    TypeDealPage: undefined;
    SettingsDealOnTimePage: undefined;
    DealWithTimerPage: undefined;
    HomePage: undefined;
};
export type RootStackParamList = {
    AddTask: undefined;
    History: undefined;
    TaskOnDayPage: undefined;
    CalendarPage: undefined;
    Drawer: undefined;
};
export type MainStack = {
    Drawer: undefined;
    TabNavigator: undefined;
};
const MainStack = createNativeStackNavigator<MainStack>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<AddTaskParamList>();

const AddTaskNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsDealOnTimePage"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="TypeDealPage" component={TypeDealPage} />
            <Stack.Screen
                name="SettingsDealOnTimePage"
                component={SettingsDealOnTimePage}
            />
            <Stack.Screen
                name="DealWithTimerPage"
                component={DealWithTimerPage}
            />
            <Stack.Screen name="HomePage" component={Home} />
        </Stack.Navigator>
    );
};

function DrawerView({ navigation }) {
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
                            onPress={() => navigation.navigate("TestPage2")}>
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

function HeaderLeft() {
    return <View></View>;
}
function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerView {...props} />}
            screenOptions={({ route, navigation }) => ({
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
                    height: 140,
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
function TabNavigator() {
    // История
    // Таймер
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { position: "absolute" },
                headerShown: false,
                // tabBarStyle:{
                //     marginTop:10
                // }
            }}
            initialRouteName="CalendarPage">
            <Tab.Screen
                name="History"
                options={{ title: "История" }}
                component={History}
            />
            <Tab.Screen
                name="AddTask"
                options={{ title: "Таймер" }}
                component={AddTaskNavigator}
            />
            <Tab.Screen
                name="CalendarPage"
                options={{ title: "Задания на месяц" }}
                component={CalendarPage}
            />
            <Tab.Screen
                name="TaskOnDayPage"
                options={{ title: "Задания на день" }}
                component={TaskOnDayPage}
            />
        </Tab.Navigator>
    );
}

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
};
