import {
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Text,
    PanResponder,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@store/hook";
import { deleteTask, setStatusTask } from "@store/tasksDatesSlice";
import { CheckBox, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SubTask, Task } from "@interfaces";
import { DraggableTextEditor } from "expo-draggable-textfield";
interface Props {
    task: Task;
    changeNameTask: (text: string, task: Task, subtask?: SubTask) => void;
    drag: () => void;
    isActive: boolean;
}

export default function TaskItem({
    task,
    changeNameTask,
    drag,
    isActive,
}: Props) {
    const dispatch = useAppDispatch();
    const inputRef = useRef<TextInput>(null);
    // const [myZIndex, setMyZIndex] = useState(0)
    const longPress = () => {
        console.log("long press");
        setIsLongPress(true)
        // inputRef.current && inputRef.current.blur();
        drag();
    };
    const [isLongPress, setIsLongPress] = useState(false)
    // const [edit, setEdit] = useState(false);
    // const openInput = () => {
    //     console.log("press");
    //     setMyZIndex(1)

    //     setEdit(true);
    //     inputRef.current && inputRef.current.focus();
        
    // };

    const handlePressOut = ()=>{
        setIsLongPress(false)
    }


    // const panResponder = PanResponder.create({
    //     onStartShouldSetPanResponder: () => true,
    //     onPanResponderGrant: () => {
    //       setIsLongPress(true);
    //       inputRef.current &&inputRef.current.focus();
    //     },
    //     onPanResponderRelease: () => {
    //       setIsLongPress(false);
    //       inputRef.current && inputRef.current.blur();
    //     },
    //   });
    

    // const longPressInput = ()=>{
    //     inputRef.current.focus()
    // }
    return (
        <TouchableOpacity
            onLongPress={longPress}
            // onPressOut={handlePressOut}
            // hitSlop={{top:10, left:100, bottom:10, right:100}}
            disabled={isActive}
            style={{
                ...styles.mainContainer,
                opacity: isActive ? 0.7 : 1,
            }}>
            <View
                style={styles.secondContainer}
                // onLongPress={longPress}
                >
                <CheckBox
                    size={23}
                    checked={task.done}
                    onPress={() => dispatch(setStatusTask(task.id))}
                    onLongPress={longPress}
                    checkedColor="red"
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
                
                {/* <View> */}
                <TextInput
                    ref={inputRef}
                    style={{
                        ...styles.input,
                        // zIndex:myZIndex,
                        // backgroundColor: isLongPress ? 'yellow' : 'white',
                        textDecorationLine: task.done ? "line-through" : "none",
                    }}
                    multiline={true}
                    maxLength={50}
                    value={task.name}
                    onChangeText={(text) => changeNameTask(text, task)}
                    // onMagicTap={openInput}
                />
            </View>
            <Pressable
                style={{ paddingHorizontal: 3 }}
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
        opacity:0.99,
        zIndex:20

    },
    secondContainer: {
        display: "flex",
        flexDirection: "row",
        width: "85%",
        alignItems: "center",
        // borderWidth: 1,
    },
    input: {
        margin: 0,
        padding: 0,
        fontSize: 20,
        width: "84%",
    },
});
