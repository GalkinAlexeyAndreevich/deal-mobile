import { Tasks } from "@interfaces";

export const typeTasks = [
    { label: "Другое", value: "Другое" },
    { label: "Работа", value: "Работа" },
    { label: "Учеба", value: "Учеба" },
    { label: "Спорт", value: "Спорт" },
    { label: "Работа по дому", value: "Работа по дому" },
];



export const defaultTasks:Tasks[] = [
	{
		id:1,
		name:"test1",
		done:false,
		subtasks:[
			{
				id:1,
				name:"test1_1",
				level:0,
				mainParentId:1,
				subParentId:null,
				done:false,
			},
			{
				id:2,
				name:"test1_2_1",
				level:1,
				mainParentId:1,
				subParentId:1,
				done:false,
			},
			{
				id:3,
				name:"test1_2_2",
				level:1,
				mainParentId:1,
				subParentId:1,
				done:false,
			},
			{
				id:4,
				name:"test1_3",
				level:2,
				mainParentId:1,
				subParentId:2,
				done:false,
			},
		]
	},
	{
		id:2,
		name:"test2",
		done:false,
		subtasks:[
			{
				id:5,
				name:"test2_1",
				level:0,
				mainParentId:2,
				subParentId:null,
				done:false,
			},
		]
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
