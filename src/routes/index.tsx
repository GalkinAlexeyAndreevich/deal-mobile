import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { MyDrawer } from "./Drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@src/components/Header";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            {/* <Stack.Navigator screenOptions={()=>({
                // headerStyle: {
                //     height: 100,
                //     borderWidth:0
                // },
                headerTitle: () => <Header />,
                headerTitleAlign: "center",
            })}>
                <Stack.Screen
                    name="tab"
                    component={TabNavigator}></Stack.Screen>
            </Stack.Navigator> */}
            <MyDrawer />
        </NavigationContainer>
    );
};
