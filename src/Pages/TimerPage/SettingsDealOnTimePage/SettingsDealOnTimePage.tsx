import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, Alert } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { useAppDispatch } from "@store/hook";
import { addTask} from "@store/dealSettings";
import { Task } from "@interfaces";
import MinutePicker from "./MinutePicker";
import { useBackgroundTimer } from "@src/TimerContext";
import CustomSelectList from "./CustomSelectList";

type TProps = NativeStackScreenProps<AddTaskParamList>;

export default function SettingsDealOnTimePage({ navigation }: TProps) {
    const dispatch = useAppDispatch();
    const { setSecondsLeft, setTimerOn } = useBackgroundTimer();
    const [selectedMinutes, setSelectedMinutes] = useState(5);
    const [selectedTask, setSelectedTask] = useState<Task>({} as Task)

    const saveChange = () => {
        console.log(selectedTask, selectedMinutes);
        
        if (!selectedTask || !selectedMinutes) {
            Alert.alert("Неполные настройки","Вы не выбрали цель или время");
            return;
        }
        setSecondsLeft(selectedMinutes * 60)
        setTimerOn(true);
        dispatch(addTask(selectedTask));
        navigation.navigate("DealWithTimerPage");
    };
    return (
        <View
            style={{
                flex: 1,
                paddingTop: 10,
                backgroundColor: "white",
            }}>
            <CustomSelectList setSelectedTask={setSelectedTask}/>
            <View style={{ display: "flex", alignItems: "flex-end" }}>
                <Text style={{ fontSize: 20, padding: 10 }}>
                    Укажите временной промежуток:
                </Text>
                <MinutePicker selected={selectedMinutes} setSelected={setSelectedMinutes}/>
            </View>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                <Button
                    title="Начать"
                    buttonStyle={{
                        borderColor: "black",
                        borderWidth: 2,
                    }}
                    type="outline"
                    titleStyle={{ color: "black", fontSize: 25 }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 30,
                        marginVertical: 30,
                        marginTop: 50,
                    }}
                    onPress={saveChange}
                />
            </View>
        </View>
    );
}
