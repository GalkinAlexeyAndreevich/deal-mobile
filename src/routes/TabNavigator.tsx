import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarPage from "@Pages/CalendarPage";
import { Image } from "react-native-elements";
import TaskNavigator from "./TaskNavigator";
import { AddTaskNavigator } from "./AddTaskNavigator";
import { TouchableOpacity } from "react-native";
import StatisticPage from "@src/Pages/StatisticPage";

export type RootStackParamList = {
    AddTask: undefined;
    Statistics: undefined;
    TasksOnDayPage: { screen: string; params: { dateNow?: string } };
    CalendarPage: { dateNow?: string };
    TaskPage: { taskId: number; uniqueId: string; currentDate: string };
    StatisticPage: undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ navigation, route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#00bcfb",
                tabBarButton: (props) => (
                    <TouchableOpacity
                        {...props}
                        onPress={(e) => {
                            if (
                                !(
                                    route.name == "AddTask" &&
                                    navigation.isFocused()
                                )
                            ) {
                                props.onPress?.(e);
                            }
                        }}
                    />
                ),
            })}
            initialRouteName="TasksOnDayPage">
            <Tab.Screen
                name="StatisticPage"
                options={{
                    title: "Статистика",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 34, height: 33 }}
                            source={require("@assets/statistic.png")}
                        />
                    ),
                }}
                component={StatisticPage}
            />
            <Tab.Screen
                name="AddTask"
                options={{
                    tabBarItemStyle: { padding: 0, margin: 0 },
                    tabBarLabelStyle: { padding: 0, margin: 0 },
                    tabBarLabel: "Таймер",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 25, height: 28 }}
                            source={require("@assets/timer5.png")}
                        />
                    ),
                }}
                component={AddTaskNavigator}
            />
            <Tab.Screen
                name="CalendarPage"
                options={{
                    title: "Месяц",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 40, height: 30 }}
                            source={require("@assets/taskOnMonth6.png")}
                        />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: () => {
                        navigation.navigate("CalendarPage", {
                            dateNow: new Date().toISOString(),
                        });
                    },
                })}
                component={CalendarPage}
                initialParams={{ dateNow: new Date().toISOString() }}
            />
            <Tab.Screen
                name="TasksOnDayPage"
                options={{
                    title: "День",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 23, height: 30 }}
                            source={require("@assets/taskOnDay1.jpg")}
                        />
                    ),
                }}
                component={TaskNavigator}
                listeners={({ navigation }) => ({
                    tabPress: () => {
                        navigation.navigate("TasksOnDayPage", {
                            screen: "TaskOnDayPage",
                            params: { dateNow: new Date().toISOString() },
                        });
                    },
                })}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
