import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, Alert } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { Button, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { addTask, setNameTask } from "@store/dealSettings";
import { ITask, Task } from "@interfaces";
import { SelectList } from "react-native-dropdown-select-list";
import MinutePicker from "./MinutePicker";
import { useBackgroundTimer } from "@src/TimerContext";

type TProps = NativeStackScreenProps<AddTaskParamList>;
interface SelectItem {
    value: string;
    key: number;
    label: number;
    disabled?: boolean;
}

export default function SettingsDealOnTimePage({ navigation }: TProps) {
    const dispatch = useAppDispatch();
    const { setSecondsLeft, setTimerOn } = useBackgroundTimer();
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const [filtered1, setFiltered1] = useState<Task[]>([]);
    const [selectData, setSelectData] = useState<SelectItem[]>([]);
    const [selectKey, setSelectedKey] = useState<number>(-1);
    const [selectedMinutes, setSelectedMinutes] = useState(5);
    useEffect(() => {
        // const newArr = tasks.filter(
        //     (task) => new Date(task.date).getDate() === new Date().getDate()
        // );
        let onlyValue: SelectItem[] = [];
        for (let item of tasks) {
            onlyValue.push({
                value: item.name,
                key: item.id,
                label: item.id,
                disabled: false,
            });
        }
        setFiltered1(tasks);
        setSelectData(onlyValue);
    }, [tasks]);

    const selectTask = (key: number) => {
        if (selectKey) {
            for (let i = 0; i < selectData.length; i++) {
                if (selectData[i].key == selectKey)
                    selectData[i].disabled = false;
                if (selectData[i].key == key) selectData[i].disabled = true;
            }
        }
        setSelectedKey(key);
    };

    const saveChange = () => {
        const findItem = filtered1.find((element) => element.id == selectKey);
        if (!findItem || !selectedMinutes) {
            Alert.alert("Неполные настройки","Вы не выбрали цель или время");
            return;
        }
        setSecondsLeft(selectedMinutes * 60)
        setTimerOn(true);
        findItem && dispatch(addTask(findItem));
        navigation.navigate("DealWithTimerPage");
    };
    return (
        <View
            style={{
                flex: 1,
                paddingTop: 10,
                backgroundColor: "white",
            }}>
            <View
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    marginHorizontal: 10,
                    maxHeight:200
                }}>
                <SelectList
                    dropdownStyles={{
                        position: "absolute",
                        top: 40,
                        width: "100%",
                        zIndex: 10,
                        backgroundColor: "#d9fcff",
                        borderWidth: 0,
                    }}
                    setSelected={(key: number) => selectTask(key)}
                    disabledTextStyles={{ fontWeight: "bold" }}
                    data={selectData}
                    save="key"
                    searchPlaceholder="Выберите цель из списка"
                    placeholder="Выберите цель из списка"
                />
            </View>

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
