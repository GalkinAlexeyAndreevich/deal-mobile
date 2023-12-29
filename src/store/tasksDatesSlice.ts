import { SubTask, Task } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultSubtasks, defaultTasks } from "@utils/dataNoFetch";

const timeToString = (time: Date | string): string => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
};

interface TypeState {
    currentDate: string;
    tasks: Task[];
    subtasks: SubTask[];
}

const initialState: TypeState = {
    currentDate: timeToString(new Date()),
    tasks: defaultTasks,
    subtasks: defaultSubtasks,
};

interface ChangeNameProps{
    task:Task,
    subtask:SubTask,
    text:string
}

const tasksDatesSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setCurrentDate(state, actions: PayloadAction<string>) {
            state.currentDate = actions.payload;
        },
        setTasks(state, actions: PayloadAction<Task[]>) {
            state.tasks = actions.payload;
        },
        setSubTasks(state, actions: PayloadAction<SubTask[]>) {
            state.subtasks = actions.payload;
        },
        setStatusTask(state, action: PayloadAction<Task>) {
            const task = action.payload;
            const index = state.tasks.findIndex((el) => el.id === task.id);
            let el = state.tasks[index];
            el.done = !el.done;
            for (let i = 0; i < el.subtasks.length; i++) {
                if (el.done) el.subtasks[i].done = true;
                else el.subtasks[i].done = false;
            }
        },
        setNameTask(state, action:PayloadAction<ChangeNameProps>){
            const {task,subtask,text} = action.payload;
            const taskIndex = state.tasks.findIndex((el) => el.id === task.id);
            let foundTask = state.tasks[taskIndex];
            if (subtask) {
                const subIndex = foundTask.subtasks.findIndex((el) => el.id === subtask.id);
                let foundSub = foundTask.subtasks[subIndex]
                foundSub.name = text;
            } else {
                foundTask.name = text;
            }
        },
        setSubtask(state,action:PayloadAction<{subtask: SubTask, task: Task}>){
            const {task,subtask} = action.payload;
            const taskIndex = state.tasks.findIndex((el) => el.id === task.id);
            let foundTask = state.tasks[taskIndex]
            const subtaskIndex = foundTask.subtasks.findIndex((el) => el.id === subtask.id);
            let foundSubtask = foundTask.subtasks[subtaskIndex]
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
        }
        
    },
});

export const { setCurrentDate, setTasks, setSubTasks, setStatusTask,setNameTask,setSubtask } =
    tasksDatesSlice.actions;

export default tasksDatesSlice.reducer;
