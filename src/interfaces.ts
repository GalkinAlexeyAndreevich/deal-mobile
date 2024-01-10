export interface IMarkedDates{
	date:string,
	dots:{key:string, color:string}[]
}
export interface SubTask{
	id:number,
	name:string,
	done:boolean,
}
export interface Task{
	id:number,
	name:string,
	done:boolean,
	subtasks?: SubTask[],
	color?:string,
	date:string,
	type:string
	priorityId?:number
}

export interface ITypeTask {
	key: string;
	value: string;
	color:string
}

export interface SelectItem {
	value: string;
	key: number;
	label: number;
	disabled?: boolean;
}


export type TypeDeal = "Мелкая сделка" | "Крупная сделка"
