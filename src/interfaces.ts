export interface ITask{
	typeTask: string,
	nameTask:string,
	time:number
}

export interface IMarkedDates{
	date:string,
	dots:{key:string, color:string}[]
}