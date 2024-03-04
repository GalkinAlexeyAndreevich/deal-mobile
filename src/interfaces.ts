export interface IMarkedDates{
	date:string,
	dots:{key:string, color:string}[]
}
export interface SubTask{
	subtask_id:string,
	subtask_name:string,
	subtask_done:boolean,
	subtask_priorityId:number
}
export interface Task{
	id:string,
	name:string,
	done:boolean,
	subtasks: SubTask[],
	color?:string,
	date:string,
	type:string
	priorityId:number
}

export interface ITypeTask {
	key: string;
	value: string;
	color:string
}

export interface SelectItem {
	value: string;
	key: string;
	label: string;
	disabled?: boolean;
}


export type TypeDeal = "Мелкая сделка" | "Крупная сделка"
