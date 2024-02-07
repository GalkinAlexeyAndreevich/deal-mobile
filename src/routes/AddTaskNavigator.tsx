import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TypeDealPage from "@Pages/TimerPage/TypeDealPage";
import SettingsDealOnTimePage from "@Pages/TimerPage/SettingsDealOnTimePage";
import DealWithTimerPage from "@Pages/TimerPage/DealWithTimerPage";
import { useBackgroundTimer } from "@src/TimerContext";
export type AddTaskParamList = {
	TypeDealPage: undefined;
	SettingsDealOnTimePage: undefined;
	DealWithTimerPage: undefined;
};
const Stack = createNativeStackNavigator<AddTaskParamList>();
export function AddTaskNavigator(){
	const {diff, timerOn} = useBackgroundTimer()
	const initialPage = timerOn&&diff?"DealWithTimerPage":"TypeDealPage"
	return (
			<Stack.Navigator
					initialRouteName={initialPage}
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
			</Stack.Navigator>
	);
};
