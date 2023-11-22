import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Text,
    View,
    ScrollView,
    Alert,
} from "react-native";
import { AddTaskParamList } from "../../routes/routes";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { useAppDispatch } from "../../store/hook";
import { addTask} from "../../store/dealSettings";
import { typeTasks } from "../../utils/dataNoFetch";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { ITask } from "interfaces";

type TProps = NativeStackScreenProps<AddTaskParamList>;
interface ITypeTask {
    label: string;
    value: string;
}
export default function TestPage({ navigation }: TProps) {
    const dispatch = useAppDispatch();
    const [typeTask, setTypeTask] = useState<ITypeTask[]>(typeTasks);
    const [timeTask, setTimeTask] = useState(
        new Date(new Date().setHours(0, 0, 0, 0))
    );
    const [selectedData, setSelectedData] = useState<ITask>({nameTask:''} as ITask);

    const [showTimer, setShowTimer] = useState(false);

    const saveChange = () => {
        if (!selectedData.nameTask || !selectedData.time) {
            Alert.alert(
                "Выберите задание которое хотите сделать  и задайте его время"
            );
            return;
        }
        dispatch(addTask(selectedData));
        navigation.navigate("TestPage3");
    };
    const changeNameTask = (task: string) => {
        console.log(task);
        
        setSelectedData((prev) => ({ ...prev, nameTask: task }));
    };
    const changeTypeTask = (typeTask: string) => {
        setSelectedData((prev) => ({ ...prev, typeTask: typeTask }));
    };

    const changeTimePicker = (
        { type }: DateTimePickerEvent,
        selectedData: Date
    ) => {
        if (type === "set") {
            setShowTimer(!showTimer);
            let minutes =
                selectedData.getHours() * 60 + selectedData.getMinutes();
            setTimeTask(selectedData);
            setSelectedData((prev) => ({ ...prev, time: minutes }));
        } else {
            setShowTimer(!showTimer);
        }
    };

    return (
        <View
            style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            <ScrollView horizontal={false}>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 10,
                    }}>
                    <View style={{ alignSelf: "center" }}>
                        <RNPickerSelect
                            onValueChange={(value) => changeTypeTask(value)}
                            items={typeTask}
                            placeholder={{}}
                            // defaultValue={typeTask[0].value}
                        />
                    </View>

                    <View style={{ width: 300 }}>
                        <Input
                            value={selectedData.nameTask}
                            placeholder="введите цель"
                            // onChange={(e)=>{changeNameTask(e.target.value)}}
                            onChangeText={(text) => changeNameTask(text)}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 60, maxWidth: 350 }}>
                    <Text style={{ fontSize: 25 }}>
                        Сколько времени вам потребуется минут?
                        <Button
                            title="Выбрать время"
                            onPress={() => setShowTimer(true)}
                        />
                    </Text>
                    {showTimer && (
                        <DateTimePicker
                            value={timeTask}
                            display="spinner"
                            mode="time"
                            onChange={changeTimePicker}
                            // minuteInterval={5}
                        />
                    )}
                </View>
                <Button
                    title="Дальше"
                    disabled={!(selectedData.nameTask && selectedData.time)}
                    buttonStyle={{
                        borderColor: "rgba(78, 116, 289, 1)",
                    }}
                    type="outline"
                    titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 30,
                        marginVertical: 10,
                        marginTop: 20,
                    }}
                    onPress={saveChange}
                />
            </ScrollView>
        </View>
    );
}
