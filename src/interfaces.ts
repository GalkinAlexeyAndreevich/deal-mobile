export interface ITask{
	typeTask: string,
	nameTask:string,
	time:number
}

export interface IMarkedDates{
	date:string,
	dots:{key:string, color:string}[]
}
// type Subtask = {
// 	name:string,
// 	done:boolean,
	
// }


export interface Tasks{
	id:number,
	name:string,
	done:boolean,
	subtasks:SubTasks[]
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
	subtasks?: SubTask[]
}

export interface SubTasks{
	id:number,
	name:string,
	level:number,
	parentId:number,
	done:boolean
}

// export interface Tasks{
// 	name:string,
// 	done:boolean,
// 	level:number
// 	subtasks:{
// 		name:string,
// 		done:boolean,
// 		level:number
// 		subtasks?:{
// 			name:string,
// 			done:boolean,
// 			level:number
// 			subtasks?:{
// 				name:string,
// 				done:boolean,
// 				level:number
// 				subtasks?:{			
// 					name:string,
// 					done:boolean,
// 					level:number
// 					subtasks?:[]
// 				}[]
// 			}[]
// 		}[]
// 	}[]
// }