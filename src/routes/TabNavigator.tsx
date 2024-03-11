import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import StatisticsPage from "@Pages/StatisticsPage";
import TaskOnDayPage from "@Pages/TaskOnDayPage";
import CalendarPage from "@Pages/CalendarPage";
import { Image } from "react-native-elements";
import TaskPage from "@src/Pages/TaskPage";
import Header from "@src/components/Header";
export type RootStackParamList = {
    AddTask: undefined;
    Statistics: undefined;
    TaskOnDayPage:  {dateNow?: string};
    CalendarPage: {dateNow?: string};
    TaskPage: { taskId: number,uniqueId:string,currentDate:string };
};
const Tab = createBottomTabNavigator<RootStackParamList>();
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarActiveTintColor: "#00bcfb",
            })}
            screenListeners={({ navigation, route }) => ({
                tabPress:(e)=>{
                   e.preventDefault() 
                   if(route.name == 'TaskOnDayPage' || route.name == 'CalendarPage'){
                        navigation.navigate(route.name,{dateNow:new Date().toISOString()})
                   }
                   navigation.navigate(route.name)
                },
            })}
            initialRouteName="TaskOnDayPage">
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
                initialParams={{dateNow:new Date().toISOString()}}
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
                initialParams={{dateNow:new Date().toISOString()}}
            />
            <Tab.Screen
                name="TaskPage"
                options={{
                    tabBarItemStyle: {
                        display: "none",
                    },
                }}
                component={TaskPage}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
