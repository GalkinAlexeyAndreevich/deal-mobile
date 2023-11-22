import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { RootStackParamList } from "../../routes/routes";
import { useState } from "react";
import { Button, CheckBox } from "react-native-elements";
import { useAppDispatch } from "../../store/hook";
import { setTypeDeal } from "../../store/dealSettings";

type TProps = NativeStackScreenProps<RootStackParamList>;

export default function TestPage({ navigation }: TProps) {
    const [firstCheckBox, setFirstCheckBox] = useState<boolean>(true);
    const [secondCheckBox, setSecondCheckBox] = useState<boolean>(false);
    const changeCheckBox = () => {
        setFirstCheckBox(!firstCheckBox);
        setSecondCheckBox(!secondCheckBox);
    };
    const dispatch = useAppDispatch()
    const saveChange = ()=>{
        if(!firstCheckBox && !secondCheckBox){
            Alert.alert("Вы попытались сломать систему, выберите один вариант")
        }
        dispatch(setTypeDeal(firstCheckBox?"Малая сделка":"Крупная сделка"))
        navigation.navigate("TestPage2");
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40, textAlign: "center" }}>
                Какую сделку вы желаете заключить
            </Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                }}>
                <View style={styles.checkbox}>
                    <CheckBox

                        size={100}
                        // status={firstCheckBox ? 'checked' : 'unchecked'}
                        checked={firstCheckBox}
                        onPress={changeCheckBox}
                        // style={{ paddingLeft:50 }}
                        checkedColor="red"
                    />
                    <Text style={styles.checkText}>Мелкая</Text>
                    <Text style={styles.checkText}>сделка</Text>
                </View>
                <View style={styles.checkbox}>
                    <CheckBox
                        size={100}
                        checked={secondCheckBox}
                        // status={secondCheckBox ? 'checked' : 'unchecked'}
                        onPress={changeCheckBox}
                        checkedColor="red"
                    />
                    <Text style={styles.checkText}>Крупная</Text>
                    <Text style={styles.checkText}>сделка</Text>
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
                        marginVertical: 10,
                        marginTop:20
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
        marginTop: 100,
        alignItems: "center",       
    },
    checkbox: {
        flex: 1,
        paddingTop:30,
        paddingLeft:17
    },
    checkText:{
        display:"flex",
        fontSize:30,
        paddingLeft:17,
        textAlign:"left",
        flexWrap:'wrap'
    }
});
