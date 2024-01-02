import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { AddTaskParamList } from "@routes/AddTaskNavigator";
import { useAppSelector } from "@store/hook";
import Timer from "@components/Timer";

type TProps = NativeStackScreenProps<AddTaskParamList>;

const secondToCombineTime = (minutes: number) => {
    return {
        minutes: minutes,
        seconds: 0,
    };
};

export default function DealWithTimerPage({ navigation }: TProps) {
    const { nameTask, time } = useAppSelector((state) => state.dealSettings);

    return (
        <View style={{ display: "flex", justifyContent:"center", alignItems:"center" }}>
            <Text style={{fontSize:25, textAlign:"center"}}>{nameTask}</Text>
            <Timer time={secondToCombineTime(time)} />
        </View>
    );
}
