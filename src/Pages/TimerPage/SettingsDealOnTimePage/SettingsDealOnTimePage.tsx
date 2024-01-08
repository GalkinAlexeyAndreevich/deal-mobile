import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Text,
    View,
    ScrollView,
    Alert,
    StyleSheet,
    Pressable,
    FlatList,
} from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { Button, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { addTask, setNameTask } from "@store/dealSettings";
import { typeTasks } from "@utils/dataNoFetch";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { ITask, Task } from "@interfaces";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import TimePicker from "@components/TimePicker";
import Fuse from "fuse.js";
import InfiniteScroll from "react-native-infinite-looping-scroll";
import ModalChooseTask from "./Modal";
import Carousel from "./Carousel";
import MinutePicker from "./MinutePicker";

type TProps = NativeStackScreenProps<AddTaskParamList>;

const fuseOptions = {
    keys: ["name"],
};

export default function SettingsDealOnTimePage({ navigation }: TProps) {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasksDates.tasks);
    const { nameTask, time } = useAppSelector((state) => state.dealSettings);
    const [filtered1, setFiltered1] = useState<Task[]>([]);
    const [filtered2, setFiltered2] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        const newArr = tasks.filter(
            (task) => new Date(task.date).getDate() === new Date().getDate()
        );
        setFiltered1(tasks);
    }, [tasks]);
    console.log(nameTask, time);

    const saveChange = () => {
        if (!nameTask || !time) {
            Alert.alert("Вы не выбрали цель или время");
            return;
        }
        navigation.navigate("DealWithTimerPage");
    };
    return (
        <View
            style={{
                flex: 1,
                paddingTop: 10,
                // alignItems: "center",
                backgroundColor: "white",
            }}>
            {/* <View >
                
                <ModalChooseTask />
            </View> */}
                        <View
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    marginHorizontal:10
                }}>
                <Text style={{ textAlign: "center" }}>Выберите цель</Text>
                <SelectList
                    dropdownStyles={{
                        // backgroundColor: "white",
                        position: "absolute",
                        top: 40,
                        width: "100%",
                        zIndex: 999,
                        // borderColor:"green"
                        backgroundColor:"#d9fcff",
                        borderWidth:0
                    }}
                    setSelected={(item) => console.log(item)}
                    // boxStyles={{ width: 300 }}
                    data={typeTasks}
                    save="value"

                    placeholder="Нажми чтобы выбрать цель"
                />
            </View>

            <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ fontSize: 20, padding: 10 }}>Укажите временной промежуток:</Text>
                <MinutePicker />

            </View>
            <View style={{flex:1,display:"flex", justifyContent:"flex-end",alignItems:"center"}}>
                    <Button
                        title="Начать"
                        buttonStyle={{
                            borderColor: "black",
                            borderWidth:2
                        }}
                        type="outline"
                        titleStyle={{ color: "black", fontSize:25 }}
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

const stylesModal = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: "white",
        display: "flex",
        // flexDirection: "row",
        // alignItems: "center",
    },
    background: {
        flex: 1,
        backgroundColor: "black",
        opacity: 0.5,
        zIndex: 1,
    },
    outerContainer: {
        zIndex: 2,
        position: "absolute",
        alignItems: "stretch",
        width: "100%",
        height: 150,
        backgroundColor: "white",
        bottom: 0,
    },
});

const styles = StyleSheet.create({
    selectedTextStyle: {
        fontSize: 30,
        fontWeight: "bold",
    },
    unselectedTextStyle: {
        fontSize: 25,
        fontWeight: "normal",
    },
});
