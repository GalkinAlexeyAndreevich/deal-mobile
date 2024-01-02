import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Button, CheckBox } from "react-native-elements";
import { useAppDispatch } from "@store/hook";
import { setTypeDeal } from "@store/dealSettings";
import { AddTaskParamList } from "@routes/AddTaskNavigator";

type TProps = NativeStackScreenProps<AddTaskParamList>;

export default function TypeDealPage({ navigation }: TProps) {
    const [firstCheckBox, setFirstCheckBox] = useState<boolean>(true);
    const [secondCheckBox, setSecondCheckBox] = useState<boolean>(false);
    const changeCheckBox = () => {
        setFirstCheckBox(!firstCheckBox);
        setSecondCheckBox(!secondCheckBox);
    };
    const dispatch = useAppDispatch()
    const saveChange = ()=>{
        dispatch(setTypeDeal(firstCheckBox?"Малая сделка":"Крупная сделка"))
        navigation.navigate("SettingsDealOnTimePage");
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, textAlign: "center" }}>
                Какую сделку вы желаете заключить?
            </Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                <View style={styles.checkbox}>
                    <CheckBox
                        size={60}
                        checked={firstCheckBox}
                        onPress={changeCheckBox}
                        containerStyle={{ padding:0,margin:0 }}
                        checkedColor="red"
                    />
                    <Text style={styles.checkText}>Мелкая сделка</Text>
                    <Text style={styles.checkText}>0-20 мин</Text>
                </View>
                <View style={styles.checkbox}>
                    <CheckBox
                        size={60}
                        checked={secondCheckBox}
                        containerStyle={{ padding:0,margin:0 }}
                        onPress={changeCheckBox}
                        checkedColor="red"
                    />
                    <Text style={styles.checkText}>Крупная сделка</Text>
                    <Text style={styles.checkText}>21 мин - 2 ч</Text>
                </View>
            </View>
            <Button
                    title="Дальше"
                    buttonStyle={{
                        borderColor: "rgba(78, 116, 289, 1)",
                    }}
                    type="outline"
                    titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 30,
                        marginTop: 50,
                    }}
                    onPress={saveChange}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        paddingTop: 100,
        alignItems: "center",   
        backgroundColor:"white"    
    },
    checkbox: {
        flex: 1,
        paddingTop:30,
        display:"flex",
        alignItems:"center"
    },
    checkText:{
        display:"flex",
        fontSize:25,
        textAlign:"center"
    }
});
