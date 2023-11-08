import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../routes/routes";
import { useState } from "react";
import { CheckBox } from "react-native-elements";

type TProps = NativeStackScreenProps<RootStackParamList>;

export default function TestPage({ navigation }: TProps) {
    const [firstCheckBox, setFirstCheckBox] = useState<boolean>(true);
    const [secondCheckBox, setSecondCheckBox] = useState<boolean>(false);
    const changeCheckBox = () => {
        setFirstCheckBox(!firstCheckBox);
        setSecondCheckBox(!secondCheckBox);
    };
    const saveChange = ()=>{
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
                        checked={firstCheckBox}
                        onPress={changeCheckBox}
                        // style={{ paddingLeft:50 }}
                        checkedColor="red"
                    />
                    <Text style={styles.checkText}>Малая</Text>
                    <Text style={styles.checkText}>сделка</Text>
                </View>
                <View style={styles.checkbox}>
                    <CheckBox
                        size={100}
                        checked={secondCheckBox}
                        onPress={changeCheckBox}
                        checkedColor="red"
                    />
                    <Text style={styles.checkText}>Крупная</Text>
                    <Text style={styles.checkText}>сделка</Text>
                </View>
            </View>
            
            <Pressable style={{backgroundColor:"white", padding:10, marginTop:20, borderRadius:20}} onPress={saveChange}>
                <Text style={{fontSize:30}}>Дальше</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        marginTop: 150,
        alignItems: "center",
        // justifyContent:"center",
        
    },
    checkbox: {
        flex: 1,
        paddingTop:30,
        paddingLeft:17
        // padding:10,
    },
    checkText:{
        display:"flex",
        fontSize:30,
        paddingLeft:17,
        textAlign:"left",
        flexWrap:'wrap'
    }
});
