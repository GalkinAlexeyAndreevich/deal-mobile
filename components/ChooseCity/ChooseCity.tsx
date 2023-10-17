import { View, Text, Switch, Pressable } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../store/hook";
import { useLocation } from "../../hooks/Location";
import { setChosenPlace, setSearchBy } from "../../store/citySlice";

type TProps = NativeStackScreenProps<RootStackParamList>;
function ChooseCity({navigation}:TProps): JSX.Element {
    const [isCurrentPlace, setIsCurrentPlace] = useState();
    const dispatch = useAppDispatch()
    const handlerCurrentPlace = () => {
        AsyncStorage.setItem('citySettings',JSON.stringify({
            searchBy:"currentPlace",
            Key:""
        }))
        dispatch(setSearchBy("currentPlace"))
    };
    return (
        <View>
            <Text>Место</Text>
            <View>
                
                <Pressable   onPress={handlerCurrentPlace}>
                    <Text>Текущее место</Text>
                </Pressable>
                <Pressable   onPress={()=>{
                    navigation.navigate("SearchCityPage");
                }}>
                    <Text>Задать другое</Text>
                </Pressable>
            </View>
            
        </View>
    );
}
export default ChooseCity;
