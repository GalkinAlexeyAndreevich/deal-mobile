import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatisticsPage from "@Pages/StatisticsPage";
import TaskOnDayPage from "@Pages/TaskOnDayPage";
import CalendarPage from "@Pages/CalendarPage";
import { AddTaskNavigator } from "./AddTaskNavigator";
import { Image } from "react-native-elements";
export type RootStackParamList = {
    AddTask: undefined;
    Statistics: undefined;
    TaskOnDayPage: undefined;
    CalendarPage: undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                // tabBarStyle: { opacity:0.99, zIndex:10, backgroundColor:"white", borderWidth:0 },
                headerShown: false,
            })}
            initialRouteName="TaskOnDayPage">
            <Tab.Screen
                name="Statistics"
                options={{ title: "Статистика" }}
                component={StatisticsPage}
            />
            <Tab.Screen
                name="AddTask"
                options={{
                    title: "Таймер",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require("@assets/timer3.png")}
                        />
                    ),
                }}
                component={AddTaskNavigator}
            />
            <Tab.Screen
                name="CalendarPage"
                options={{
                    title: "Задания на месяц",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 37, height: 33 }}
                            source={require("@assets/taskOnMonth5.png")}
                        />
                    ),
                }}
                component={CalendarPage}
            />
            <Tab.Screen
                name="TaskOnDayPage"
                options={{
                    title: "Задания на день",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 20, height: 26 }}
                            source={require("@assets/taskOnDay1.jpg")}
                        />
                    ),
                }}
                component={TaskOnDayPage}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
