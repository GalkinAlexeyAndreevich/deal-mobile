import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "./Drawer";

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
};
