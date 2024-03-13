import { ITypeTask, SubTask, Task } from "@interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateSubtask, updateTask } from "db";

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
    subtaskId: number | undefined;
    text: string;
}

const tasksDatesSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks(state, actions: PayloadAction<Task[]>) {
            state.tasks = actions.payload;
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        setType(state, action: PayloadAction<ITypeTask[]>) {
            state.typesTask = action.payload;
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
            updateTask(el)
            for (let i = 0; i < el.subtasks.length; i++) {
                if (el.done) el.subtasks[i].subtask_done = true;
                else el.subtasks[i].subtask_done = false;
                updateSubtask(el.subtasks[i])
            }
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        setNameTask(state, action: PayloadAction<ChangeNameProps>) {
            const { taskId, subtaskId, text } = action.payload;
            
            const taskIndex = state.tasks.findIndex((el) => el.id === taskId);
            let foundTask = state.tasks[taskIndex];
            console.log(foundTask);
            
            if (subtaskId) {
                const subIndex = foundTask.subtasks.findIndex(
                    (el) => el.subtask_id === subtaskId
                );
                let foundSub = foundTask.subtasks[subIndex];
                if(foundSub){
                    foundSub.subtask_name = text;
                    updateSubtask(foundSub)
                }
            }  else if(foundTask) {
                foundTask.name = text;
                updateTask(foundTask)
                console.log('new task name', foundTask.name);
                
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
                (el) => el.subtask_id === subtaskId
            );
            let foundSubtask = foundTask.subtasks[subtaskIndex];
            foundSubtask.subtask_done = !foundSubtask.subtask_done;
            updateSubtask(foundSubtask)
            // Если задача была выполнена, но мы отменили выполнение подзадачи, задача будет отменена
            if (foundTask.done && !foundSubtask.subtask_done) foundTask.done = false;
            else {
                // Если все подзадачи будут выполнены, задача будет выполнена
                let checkOnDone = true;
                for (let item of foundTask.subtasks) {
                    if (!item.subtask_done) checkOnDone = false;
                }
                if (checkOnDone)  foundTask.done = true;
            }
            updateTask(foundTask)
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
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
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
                (subtask) => subtask.subtask_id !== subtaskId
            );
            state.tasks[taskIndex].subtasks = newSubtask;
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        setTypeTask(state, action:PayloadAction<{taskId:number, newTypeId:number}>){
            const {taskId, newTypeId} = action.payload
            const taskIndex = state.tasks.findIndex((el) => el.id === taskId);
            state.tasks[taskIndex].typeId = newTypeId
            updateTask(state.tasks[taskIndex])
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        },
        addSubtaskInTask(state,action:PayloadAction<{taskId:number, subtask:SubTask}>){
            const {taskId, subtask} = action.payload
            const taskIndex = state.tasks.findIndex((el) => el.id === taskId);
            state.tasks[taskIndex].subtasks = [subtask,...state.tasks[taskIndex].subtasks]
            if(state.tasks[taskIndex].done && !subtask.subtask_done){
                state.tasks[taskIndex].done = false
            }
            AsyncStorage.setItem("savedTask", JSON.stringify(state.tasks));
        }
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
    deleteSubtask,
    changeArrSubtaskInTask,
    setPositionTasks,
    setTypeTask,
    addSubtaskInTask
} = tasksDatesSlice.actions;

export default tasksDatesSlice.reducer;
