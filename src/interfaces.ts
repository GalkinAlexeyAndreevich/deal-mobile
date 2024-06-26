export interface IMarkedDates{
	date:string,
	dots:{key:string, color:string}[]
}
export interface SubTask{
	subtask_id:number,
	subtask_name:string,
	subtask_done:boolean,
	subtask_priorityId:number
}
export interface Task{
	id:number,
	name:string,
	done:boolean,
	subtasks: SubTask[],
	color?:string,
	date:string,
	typeId:number
	priorityId:number
}

export interface ITypeTask {
	key: number;
	value: string;
	color:string
}

export interface SelectItem {
	value: string;
	key: number;
	label: string;
	disabled?: boolean;
}

export type TypeDeal = "Мелкая сделка" | "Крупная сделка"

