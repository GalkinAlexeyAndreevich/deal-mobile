import Home from "../Pages/Home";
import Main from "../Pages/Main";
import TestPage1 from "../Pages/TestPage1";
import TestPage2 from "../Pages/TestPage2";
import TestPage3 from "../Pages/TestPage3";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    TestPage1: undefined;
    TestPage2: undefined;
    TestPage3: undefined;
    HomePage:undefined;
    MainPage:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const AppNavigator = () => {
    return (
        <NavigationContainer>
                <Stack.Navigator initialRouteName="HomePage">
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
                    <Stack.Screen name="MainPage" component={Main} />
                </Stack.Navigator>

        </NavigationContainer>
    );
};
