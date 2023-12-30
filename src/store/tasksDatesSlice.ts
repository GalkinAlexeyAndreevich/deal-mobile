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

interface ChangeNameProps {
    taskId: number;
    subtaskId: number;
    text: string;
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
        setStatusTask(state, action: PayloadAction<number>) {
            const taskId = action.payload;
            const index = state.tasks.findIndex((el) => el.id === taskId);
            let el = state.tasks[index];
            el.done = !el.done;
            for (let i = 0; i < el.subtasks.length; i++) {
                if (el.done) el.subtasks[i].done = true;
                else el.subtasks[i].done = false;
            }
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
        },
        deleteTask(state, action: PayloadAction<number>) {
            const taskId = action.payload;
            const newTasks = state.tasks.filter((task) => task.id !== taskId);
            state.tasks = newTasks;
        },
        deleteSubtask(state,action:PayloadAction<{taskId:number, subtaskId:number}>){
            const {taskId,subtaskId} = action.payload

            state.tasks.map(task=>)

            const taskIndex = state.tasks.findIndex((el) => el.id === taskId);
            state.tasks[taskIndex]
            let foundTask = .subtasks.filter;
        }
    },
});

export const {
    setCurrentDate,
    setTasks,
    setSubTasks,
    setStatusTask,
    setNameTask,
    setSubtask,
    deleteTask,
} = tasksDatesSlice.actions;

export default tasksDatesSlice.reducer;
