import {
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Text,
    // PanResponder,
    // TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@store/hook";
import { deleteTask, setStatusTask } from "@store/tasksDatesSlice";
import { CheckBox, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SubTask, Task } from "@interfaces";
import { DragTextEditor } from "react-native-drag-text-editor";

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
        setIsLongPress(true);
        // inputRef.current && inputRef.current.blur();
        drag();
    };
    const [isLongPress, setIsLongPress] = useState(false);
    // const [edit, setEdit] = useState(false);
    // const openInput = () => {
    //     console.log("press");
    //     setMyZIndex(1)

    //     setEdit(true);
    //     inputRef.current && inputRef.current.focus();

    // };

    const handlePressOut = () => {
        setIsLongPress(false);
    };

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
    const viewComponent = () => <View style={styles.cornerStyles} />;
    const _cornerComponent = [
        {
            side: "TR",
            customCornerComponent: () => viewComponent(),
        },
    ];

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
                {/* <CheckBox
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
                /> */}
                <View>
                    <Text>1</Text>
                    <DragTextEditor
                        visible={true}
                        
                        // placeholder="tgssasga"
                        // resizerSnapPoints={['right', 'left']}
                        // value={",dgjsd;gjs;dgjsd;gjsd;gj;sdg"}
                        // // onChangeText={(text) => changeNameTask(text, task)}
                        // externalBorderStyles={styles.borderStyles}
                        // cornerComponents={_cornerComponent}
                        externalTextStyles={styles.textStyles}
                    />
                </View>

                {/* <View/> */}
                {/* <TextInput
                        style={{
                            ...styles.input,
                            // zIndex:myZIndex,
                            // backgroundColor: isLongPress ? 'yellow' : 'white',
                            textDecorationLine: task.done
                                ? "line-through"
                                : "none",
                        }}
                        multiline={true}
                        maxLength={50}
                        value={task.name}
                        onChangeText={(text) => changeNameTask(text, task)}
                        editable={false}
                        pointerEvents="none"
                        disableFullscreenUI={true}
                        // onMagicTap={openInput}
                    /> */}
                {/* <Text>glkhdglkasdghsldaghsdlgkhsadlkghsaldhgsldkg</Text> */}
            </View>
            {/* <Pressable
                style={{ paddingHorizontal: 3 }}
                onPress={() => dispatch(deleteTask(task.id))}>
                <Icon name="close" size={25} color="red" />
            </Pressable> */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    borderStyles: {
        // borderStyle: "dashed",
        borderColor: "black",
    },
    textStyles: {
        color: "#000",
        fontSize:20
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    cornerStyles: {
        flex: 1,
        opacity:0.99,
        zIndex:100,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white",
        borderColor: "#aaa",
    },
    mainContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // opacity: 0.99,
        // zIndex: 20,
    },
    secondContainer: {
        display: "flex",
        // flexDirection: "row",
        // width: "85%",
        width:200,
        height:400,
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
