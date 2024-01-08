import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "./Drawer";
import TabNavigator from "./TabNavigator";

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
};
