import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, Alert } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@store/hook";
import { addTask, setNameTask} from "@store/dealSettings";
import { Task } from "@interfaces";
import MinutePicker from "./MinutePicker";
import { useBackgroundTimer } from "@src/TimerContext";
import CustomSelectList from "./CustomSelectList";
import moment from "moment";

type TProps = NativeStackScreenProps<AddTaskParamList>;

export default function SettingsDealOnTimePage({ navigation }: TProps) {
    const dispatch = useAppDispatch();
    const { setTimerOn,setTimeEnd,setBeginTimer } = useBackgroundTimer();
    const [selectedMinutes, setSelectedMinutes] = useState(5);
    const [selectedTask, setSelectedTask] = useState<Task>({} as Task)


    useEffect(()=>{
        dispatch(setNameTask(""))
    },[])

    const saveChange = () => {
        console.log(selectedTask, selectedMinutes);
        const check = !selectedTask || Object.keys(selectedTask).length<1
        if (check || !selectedMinutes) {
            Alert.alert("Неполные настройки","Вы не выбрали цель или время");
            return;
        }
        const hours = Math.floor(selectedMinutes / 60)
        const minutes = selectedMinutes % 60
        console.log(moment().toISOString(),moment().add(hours,'h').add(minutes,'m').toISOString());
        // console.log(moment().add(hours,'h').add(minutes,'m').toISOString());
        setTimerOn(true);
        setTimeEnd(moment().add(hours,'h').add(minutes,'m').toISOString())
        setBeginTimer(true)
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
            <View style={{ flex:1,display: "flex", justifyContent:"flex-end" }}>
                <Text style={{ fontSize: 22, paddingVertical: 10, textAlign:"center" }}>
                    Укажите временной промежуток:
                </Text>
                <MinutePicker selected={selectedMinutes} setSelected={setSelectedMinutes}/>
            </View>
            <View
                style={{
                    // flex: 1,
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
