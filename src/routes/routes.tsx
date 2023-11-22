import Home from "../Pages/Home";
import Main from "../Pages/Main";
import TestPage1 from "../Pages/TestPage1";
import TestPage2 from "../Pages/TestPage2";
import TestPage3 from "../Pages/TestPage3";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TaskOnDayPage from "../Pages/TaskOnDayPage";
import CalendarPage from "../Pages/CalendarPage";
import { Image } from "react-native-elements/dist/image/Image";
import { Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import About from "../Pages/About";
import { Button } from "@rneui/base";
import {Ionicons} from "@expo/vector-icons";

export type AddTaskParamList = {
    TestPage1: undefined;
    TestPage2: undefined;
    TestPage3: undefined;
    HomePage: undefined;
};
export type RootStackParamList = {
    AddTask: undefined;
    MainPage: undefined;
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
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="TestPage1"
                component={TestPage1}
                options={{
                    title: "TestPage1",
                }}
            />
            <Stack.Screen name="TestPage2" component={TestPage2} />
            <Stack.Screen name="TestPage3" component={TestPage3} />
            <Stack.Screen name="HomePage" component={Home} />
        </Stack.Navigator>
    );
};

function DrawerView({ navigation }) {
    return (
        <SafeAreaView>
            <Text style={{ paddingBottom: 20 }}>Настройки</Text>
            <Text style={{ marginBottom: 20, textAlign: "center" }}>
                Настройки
            </Text>
            <View style={{ display: "flex", gap: 10 }}>
                <Button onPress={() => navigation.navigate("About")}>
                    About
                </Button>
                <Button onPress={() => navigation.navigate("TabNavigator")}>
                    Основное приложение
                </Button>
            </View>
        </SafeAreaView>
    );
}
function MyDrawer() {
    return (
        <Drawer.Navigator
        drawerContent={props => <DrawerView  {...props}/>}
        
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
                headerStyle: { height: 140 },
                headerTitle: () => <Header />,
                headerTitleAlign: "center",
                drawerPosition: "right",
                headerLeft:false
            })}>
            <Drawer.Screen name="TabNavigator" component={TabNavigator} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    );
}
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                // tabBarStyle: { position: "absolute" },
                headerShown: false,
            }}>
            <Tab.Screen name="AddTask" component={AddTaskNavigator} />
            <Tab.Screen name="MainPage" component={Main} />
            <Tab.Screen name="TaskOnDayPage" component={TaskOnDayPage} />
            <Tab.Screen name="CalendarPage" component={CalendarPage} />
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
