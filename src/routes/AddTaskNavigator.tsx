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
	const {timeEnd} = useBackgroundTimer()

	const initialPage = timeEnd.length?"DealWithTimerPage":"TypeDealPage"
	
	return (
			<Stack.Navigator
					initialRouteName={initialPage}
					// screenListeners={}
					screenOptions={{
							headerShown: false,
					}}
					screenListeners={({ route }) => ({
						beforeRemove:(e)=>{
							if(e.data?.action?.type == "GO_BACK" && route.name == "DealWithTimerPage"){
								e.preventDefault(); 
							}
						}
					})}>
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
