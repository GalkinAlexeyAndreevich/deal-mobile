import {
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useAppDispatch } from "@store/hook";
import { deleteTask, setStatusTask } from "@store/tasksDatesSlice";
import { CheckBox, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SubTask, Task } from "@interfaces";

interface Props {
    task: Task;
    changeNameTask: (text: string, task: Task, subtask?: SubTask) => void;
    drag: () => void;
    isActive: boolean;
    changed:boolean,
    setChanged:Dispatch<SetStateAction<boolean>>
}

export default function TaskItem({
    task,
    changeNameTask,
    drag,
    isActive,
    changed,
    setChanged
}: Props) {
    const dispatch = useAppDispatch();
    const inputRef = useRef<TextInput>(null);
    const longPress = () => {
        console.log("long press");
        drag();
    };
    const enableInput = ()=>{
        console.log("enable");
        if(!isActiveInput){
            inputRef.current && inputRef.current.focus()
        }
        setChanged(true)
        setIsActiveInput(true);
        
    }
    const blurInput = ()=>{
        console.log("unfocus");
        setIsActiveInput(false);
        inputRef.current && inputRef.current.blur()
    }
    const [isActiveInput, setIsActiveInput] = useState(false);


    return (
        <TouchableOpacity
            onLongPress={longPress} 
            onPress={enableInput}
            disabled={isActive}
            style={{
                ...styles.mainContainer,
                opacity: isActive ? 0.7 : 1,
            }}>
            <View
                style={styles.secondContainer}
            >
                <CheckBox
                    size={23}
                    checked={task.done}
                    onPress={() => dispatch(setStatusTask(task.id))}
                    checkedColor="red"
                    onLongPress={longPress}
                    containerStyle={{ margin: 0, paddingHorizontal: 0 }}
                    checkedIcon={
                        <Image
                            source={require("@assets/galochka.jpg")}
                            style={{ height: 30, width: 30 }}
                        />
                    }
                    uncheckedIcon={
                        <Image
                            source={require("@assets/uncheckedGalochka.jpg")}
                            style={{ height: 30, width: 30 }}
                        />
                    }
                />
                {isActiveInput && changed? <TextInput
                        ref={inputRef}
                        style={{
                            ...styles.input,
                            textDecorationLine: task.done
                                ? "line-through"
                                : "none",
                        }}
                        autoFocus={isActiveInput}
                        multiline={true}
                        maxLength={50}
                        value={task.name}
                        onChangeText={(text) => changeNameTask(text, task)}
                        onEndEditing={blurInput}
                    />:
                    <Text style={{fontSize:20}}>
                        {task.name}
                    </Text>
                }
            </View>
            <Pressable
                style={{ paddingHorizontal: 3 }}
                onLongPress={longPress}
                onPress={() => dispatch(deleteTask(task.id))}>
                <Icon name="close" size={25} color="red" />
            </Pressable>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    secondContainer: {
        display: "flex",
        flexDirection: "row",
        width: "77%",
        alignItems: "center",
    },
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        // width: "80%",
    },
});
