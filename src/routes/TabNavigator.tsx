import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import StatisticsPage from "@Pages/StatisticsPage";
import TaskOnDayPage from "@Pages/TaskOnDayPage";
import CalendarPage from "@Pages/CalendarPage";
import { Image } from "react-native-elements";
import TaskPage from "@src/Pages/TaskPage";
import Header from "@src/components/Header";
import TaskNavigator from "./TaskNavigator";
export type RootStackParamList = {
    AddTask: undefined;
    Statistics: undefined;
    TasksOnDayPage:  {screen:string, params:{dateNow?: string}};
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
            initialRouteName="TasksOnDayPage">
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
                listeners={({navigation})=>({
                    tabPress: () => {
                        navigation.navigate('CalendarPage',{dateNow:new Date().toISOString()})
                      },
                })}
                component={CalendarPage}
                initialParams={{dateNow:new Date().toISOString()}}
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
                listeners={({navigation})=>({
                    tabPress: () => {
                            navigation.navigate("TasksOnDayPage",{
                                screen:'TaskOnDayPage',
                                params:{dateNow:new Date().toISOString()}
                            })
                      },
                })}
                // initialParams={{dateNow:new Date().toISOString()}}
            />
            {/* <Tab.Screen
                name="TaskPage"
                options={{
                    tabBarItemStyle: {
                        display: "none",
                    },
                }}
                component={TaskPage}
            /> */}
        </Tab.Navigator>
    );
}

export default TabNavigator;
