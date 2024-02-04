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
                tabBarActiveTintColor:'#00bcfb'
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
                    tabBarItemStyle: {padding:0, margin:0},//use This for Icon or image
                    tabBarLabelStyle: {padding:0, margin:0},// use This for lable 
                    tabBarLabel: 'Таймер',
                    // title: "Таймер",
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
                component={CalendarPage}
            />
            <Tab.Screen
                name="TaskOnDayPage"
                options={{
                    title: "День",
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 23, height: 30 }}
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
