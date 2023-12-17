import { Tasks, Task } from "@interfaces";

export const typeTasks = [
    { label: "Другое", value: "Другое" },
    { label: "Работа", value: "Работа" },
    { label: "Учеба", value: "Учеба" },
    { label: "Спорт", value: "Спорт" },
    { label: "Работа по дому", value: "Работа по дому" },
];



// export const defaultTasks:Tasks[] = [
// 	{
// 		id:1,
// 		name:"test1",
// 		done:false,
// 		subtasks:[
// 			{
// 				id:1,
// 				name:"test1_1",
// 				level:0,
// 				parentId:1,
// 				done:false,
// 			},
// 			{
// 				id:2,
// 				name:"test1_2",
// 				level:1,
// 				parentId:1,
// 				done:false,
// 			},
// 			{
// 				id:3,
// 				name:"test1_3",
// 				level:2,
// 				parentId:2,
// 				done:false,
// 			},
// 		]
// 	},
// 	{
// 		id:2,
// 		name:"test2",
// 		done:false,
// 		subtasks:[
// 			{
// 				id:4,
// 				name:"test2_1",
// 				level:0,
// 				parentId:2,
// 				done:false,
// 			},
// 		]
// 	}
// ]


export const defaultTasks:Task[] = [
	{
		id:1,
		name:"test1",
		done:false,
		date:"2023-11-10",
		subtasks:[
			{
				id:1,
				name:"test1_1",
				done:false,
			},
			{
				id:2,
				name:"test1_2",
				done:false,
			},
			{
				id:3,
				name:"test1_3",
				done:false,
			},
		]
	},
	{
		id:2,
		name:"test2",
		done:false,
		date:"2023-11-10",
		subtasks:[
			{
				id:4,
				name:"test2_1",
				done:false,
			},
		]
	},
	{
		id:3,
		name:"test3",
		done:false,
		date:"2023-11-11",
		subtasks:[]
	},
	{
		id:4,
		name:"test3",
		done:false,
		date:"2023-11-11",
		subtasks:[]
	}
]







// export const defaultData: Tasks[] = [
//     {
//         name: "Чизкейк",
//         done: false,
//         level: 0,
//         subtasks: [],
//     },
//     {
//         name: "Прибраться дома",
//         done: false,
//         level: 0,
//         subtasks: [
//             {
//                 name: "Помыть посуду",
//                 done: false,
//                 level: 1,
//                 subtasks: [],
//             },
//             {
//                 name: "Помыть пол",
//                 done: false,
//                 level: 1,
//                 subtasks: [
//                     {
//                         name: "Помыть пол в кухне",
//                         done: false,
//                         level: 2,
//                     },
//                     {
//                         name: "Помыть пол в коридоре",
//                         done: false,
//                         level: 2,
//                     },
//                 ],
//             },
//         ],
//     },
// ];
