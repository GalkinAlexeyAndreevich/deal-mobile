import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useAppDispatch } from "@store/hook";
import { setTypeDeal } from "@store/dealSettings";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { TypeDeal } from "@src/interfaces";

type TProps = NativeStackScreenProps<AddTaskParamList>;

export default function TypeDealPage({ navigation }: TProps) {
    const dispatch = useAppDispatch()
    const nextPage = (typeDeal:TypeDeal)=>{
        dispatch(setTypeDeal(typeDeal))
        navigation.navigate("SettingsDealOnTimePage");
    }
    return (
        <View style={styles.container}>
            <Image
                style={{width: 250, height: 140 }}
                source={require("@assets/handshake.jpg")}
            />
            <Text style={{fontSize: 25, textAlign: "center" }}>
                Какую сделку вы желаете заключить?
            </Text>
            <View
                style={{
                    flex:1,
                    flexDirection: "column",
                    marginTop:60
                }}>
                <Pressable onPress={()=>{nextPage("Крупная сделка")}} style={styles.button}>
                    <Text style={{fontSize:29}}>Крупная сделка</Text> 
                    <Text>от 35 мин до 2 ч</Text>  
                </Pressable>
                <Pressable onPress={()=>{nextPage("Мелкая сделка")}} style={styles.button}>
                    <Text style={{fontSize:29}}>Мелкая сделка</Text>
                    <Text>от 5 мин  до 30 мин</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",   
        backgroundColor:"white",
        paddingTop:20    
    },
    button: {
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:10,
        marginBottom:20,
        justifyContent:"center",
        alignItems:"center"
    },
    checkText:{
        // display:"flex",
        fontSize:25,
        // textAlign:"center"
    }
});
