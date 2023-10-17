import SettingsPage from "../Pages/SettingsPage";
import TestPage from "../Pages/TestPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeatherPage from "../Pages/WeatherPage";
import SearchCityPage from "../Pages/SearchCityPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type RootStackParamList = {
    SettingsPage: undefined;
    WeatherPage: { codeCity: string };
    TestPage: undefined;
    DrawerNavigator: undefined;
    SearchCityPage: undefined;
};
const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();
export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator initialRouteName="WeatherPage">
                    <Stack.Screen
                        name="SettingsPage"
                        component={SettingsPage}
                        options={{
                            title: "Настройки",
                        }}
                    />
                    <Stack.Screen name="TestPage" component={TestPage} />
                    <Stack.Screen name="WeatherPage" component={WeatherPage} />
                    <Stack.Screen
                        name="SearchCityPage"
                        component={SearchCityPage}
                        options={{
                            title: "Поиск города",
                        }}
                    />
                </Stack.Navigator>
            </QueryClientProvider>

        </NavigationContainer>
    );
};
