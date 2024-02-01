import { ITypeTask, SubTask, Task } from "@interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
    tasks: Task[];
    subtasks: SubTask[];
    typesTask: ITypeTask[];
}

const initialState: TypeState = {
    tasks: [],
    subtasks: [],
    typesTask: [],
};

interface ChangeNameProps {
    taskId: number;
    subtaskId: number;
    text: string;
}

const tasksDatesSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks(state, actions: PayloadAction<Task[]>) {
            state.tasks = actions.payload;
            console.log("изменили цели", state.tasks);
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        setType(state, action: PayloadAction<ITypeTask[]>) {
            state.typesTask = action.payload;
            console.log("изменили тип", state.typesTask);
            AsyncStorage.setItem(
                "savedTypesTask",
                JSON.stringify(state.typesTask)
            );
        },
        setSubTasks(state, actions: PayloadAction<SubTask[]>) {
            state.subtasks = actions.payload;
        },
        setStatusTask(state, action: PayloadAction<number>) {
            const taskId = action.payload;
            const index = state.tasks.findIndex((el) => el.id === taskId);
            let el = state.tasks[index];
            el.done = !el.done;
            for (let i = 0; i < el.subtasks.length; i++) {
                if (el.done) el.subtasks[i].done = true;
                else el.subtasks[i].done = false;
            }
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        setNameTask(state, action: PayloadAction<ChangeNameProps>) {
            const { taskId, subtaskId, text } = action.payload;
            const taskIndex = state.tasks.findIndex((el) => el.id === taskId);
            let foundTask = state.tasks[taskIndex];
            if (subtaskId) {
                const subIndex = foundTask.subtasks.findIndex(
                    (el) => el.id === subtaskId
                );
                let foundSub = foundTask.subtasks[subIndex];
                foundSub.name = text;
            } else {
                foundTask.name = text;
            }
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        setSubtask(
            state,
            action: PayloadAction<{ taskId: number; subtaskId: number }>
        ) {
            const { taskId, subtaskId } = action.payload;
            const taskIndex = state.tasks.findIndex((el) => el.id === taskId);
            let foundTask = state.tasks[taskIndex];
            const subtaskIndex = foundTask.subtasks.findIndex(
                (el) => el.id === subtaskId
            );
            let foundSubtask = foundTask.subtasks[subtaskIndex];
            foundSubtask.done = !foundSubtask.done;
            // Если задание было выполнено, но мы отменили выполнение подзадания, задание будет отменено
            if (foundTask.done && !foundSubtask.done) {
                foundTask.done = false;
            } else {
                // Если все подзадания будут выполнены, задание будет выполнено
                let checkOnDone = true;
                for (let item of foundTask.subtasks) {
                    if (!item.done) checkOnDone = false;
                }
                if (checkOnDone) {
                    foundTask.done = true;
                }
            }
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        changeArrSubtaskInTask(
            state,
            action: PayloadAction<{ taskId: number; subtasks: SubTask[] }>
        ) {
            const { taskId, subtasks } = action.payload;
            const taskIndex = state.tasks.findIndex(
                (element) => element.id === taskId
            );
            console.log("изменяю положение подзадач", subtasks);
            console.log(taskIndex);

            state.tasks[taskIndex].subtasks = subtasks;
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        setPositionTasks(state, action:PayloadAction<{newTasks:Task[], currentDate:string}>){
            const {newTasks, currentDate} = action.payload
            // const newArr = [...state.tasks].concat(newTasks).unique(); 
            // state.tasks = Array.from(new Set(state.tasks.concat(newTasks)))
            state.tasks = state.tasks.filter(task=>task.date != currentDate)
            state.tasks = state.tasks.concat(newTasks)
        },
        deleteTask(state, action: PayloadAction<number>) {
            const taskId = action.payload;
            const newTasks = state.tasks.filter((task) => task.id !== taskId);
            state.tasks = newTasks;
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        deleteSubtask(
            state,
            action: PayloadAction<{ taskId: number; subtaskId: number }>
        ) {
            const { taskId, subtaskId } = action.payload;
            const taskIndex = state.tasks.findIndex((el) => el.id === taskId);
            const newSubtask = state.tasks[taskIndex].subtasks.filter(
                (subtask) => subtask.id !== subtaskId
            );
            state.tasks[taskIndex].subtasks = newSubtask;
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
    },
});

export const {
    setTasks,
    setType,
    setSubTasks,
    setStatusTask,
    setNameTask,
    setSubtask,
    deleteTask,
    changeArrSubtaskInTask,
    setPositionTasks
} = tasksDatesSlice.actions;

export default tasksDatesSlice.reducer;
