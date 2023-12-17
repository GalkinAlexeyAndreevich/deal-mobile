export interface ITask{
	typeTask: string,
	nameTask:string,
	time:number
}

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
}

export interface ITypeTask {
	label: string;
	value: string;
}



