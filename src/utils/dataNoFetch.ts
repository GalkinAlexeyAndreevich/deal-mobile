import { SubTask, Task } from "@interfaces";

export const typeTasks = [
    { label: "Другое", value: "Другое", color: "#a6fcaa" },
    { label: "Работа", value: "Работа", color: "#dbd1fe" },
    { label: "Учеба", value: "Учеба", color: "#ffcdfc" },
    { label: "Спорт", value: "Спорт", color: "#ffc4c4" },
    { label: "Работа по дому", value: "Работа по дому", color: "#fff272" },
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


export const defaultSubtasks:SubTask[] = [
    {
        id: 1,
        name: "test1_1",
        done: false,
    },
    {
        id: 2,
        name: "test1_2",
        done: false,
    },
    {
        id: 3,
        name: "test1_3",
        done: false,
    },
    {
        id: 4,
        name: "test2_1",
        done: false,
    },
]

export const defaultTasks: Task[] = [
    {
        id: 1,
        name: "test1",
        done: false,
        date: "2023-11-10",
        type: "Другое",
        subtasks: [
            {
                id: 1,
                name: "test1_1",
                done: false,
            },
            {
                id: 2,
                name: "test1_2",
                done: false,
            },
            {
                id: 3,
                name: "test1_3",
                done: false,
            },
        ],
    },
    {
        id: 2,
        name: "test2",
        done: false,
        date: "2023-11-10",
        type: "Другое",
        subtasks: [
            {
                id: 4,
                name: "test2_1",
                done: false,
            },
        ],
    },
    {
        id: 3,
        name: "test3",
        done: false,
        date: "2023-11-11",
        type: "Другое",
        subtasks: [],
    },
    {
        id: 4,
        name: "test3",
        done: false,
        type: "Другое",
        date: "2023-11-11",
        subtasks: [],
    },
];

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

// let markedDates: MarkedDates = {
//     "2023-10-31": {
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272" },
//         ],
//     },
//     "2023-10-10": {
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272",  },
//         ],
//     },
//     "2023-10-12": {
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272",  },
//         ],
//     },
//     "2023-11-10": {
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272",  },
//         ],
//     },
//     "2023-11-11": {
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272",  },
//         ],
//     },
//     "2023-11-15": {
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272",  },
//         ],
//     },
//     "2023-11-20": {
//         marked: true, selectedColor: 'blue',
//         textColor:"white",
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272",  },
//             { key: "test1", color: "#ffc4c4",  },
//             { key: "test3", color: "#ffcdfc",  },
//             { key: "test", color: "#dbd1fe",  },
//         ],
//         customStyles: {
//             container: {
//               backgroundColor: 'green'
//             },
//             text: {
//               color: 'black',
//               fontWeight: 'bold'
//             }
//           },
//         selectedTextColor:"orange"
//         // selectedColor: 'orange'
//     },
//     "2023-11-21": {
//         dots: [
//             { key: "workout", color: "#a6fcaa" },
//             { key: "massage", color: "#fff272",  },
//         ],
//     },
// };
