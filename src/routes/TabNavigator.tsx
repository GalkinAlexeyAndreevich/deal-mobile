import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatisticsPage from "@Pages/StatisticsPage";
import TaskOnDayPage from "@Pages/TaskOnDayPage";
import CalendarPage from "@Pages/CalendarPage";
import { AddTaskNavigator } from "./AddTaskNavigator";
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
					screenOptions={{
							// tabBarStyle: { position: "absolute" },
							headerShown: false,
					}}
					initialRouteName="AddTask">
					<Tab.Screen
							name="Statistics"
							options={{ title: "Статистика" }}
							component={StatisticsPage}
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

export default TabNavigator