import { ITypeTask } from './../interfaces';
import { SubTask, Task } from "@interfaces";
// export const defaultTypeTasks:ITypeTask[] = [
//     { key: "Без категории", value: "Без категории", color: "#ecedef" },
//     { key: "Другое", value: "Другое", color: "#a6fcaa" },
//     { key: "Работа", value: "Работа", color: "#dbd1fe" },
//     { key: "Учеба", value: "Учеба", color: "#ffcdfc" },
//     { key: "Спорт", value: "Спорт", color: "#ffc4c4" },
//     { key: "Работа по дому", value: "Работа по дому", color: "#fff272" },
// ];
export const defaultTypeTasks:ITypeTask[] = [
        { key: 1, value: "Без категории", color: "#FFFCB9" },
        { key: 2, value: "Учёба", color: "rgb(189,254,248)" },
        { key: 3, value: "Работа", color: "rgb(204,204,254)" },
        { key: 4, value: "Спорт", color: "rgb(255,171,171)" },
        { key: 5, value: "Работа по дому", color: "rgb(194,239,154)" },
        // { key: "Другое", value: "Другое", color: "rgb(186,214,228)" },
        
];
export const variableColors = [
    "#FFA398","#FFABAB","#FFC48C","#FFFCB9","#E0FA8D",
    "#C2F09B","#AAD989","#92FFC6","#BDFEF8","#ABE4FF",
    "#BAD6E4","#CCCCFE","#9F94D8","#CFA0FE","#FFE1EF"
]


export const getArrMinutes = ()=>{
    let arrMinutes = []
    for(let i=5; i<=120;i++){
        if(i%5==0)arrMinutes.push(i)
    }
    return arrMinutes
}




// export const defaultTasks: Task[] = [
//     {
//         id: '1',
//         name: "test1",
//         done: false,
//         date: "2024-01-12",
//         typeId: "3",
//         priorityId:1,
//         subtasks: [
//             {
//                 subtask_id: '1',
//                 subtask_name: "test1_1",
//                 subtask_done: false,
//                 subtask_priorityId:0
//             },
//             {
//                 subtask_id: '2',
//                 subtask_name: "test1_2",
//                 subtask_done: false,
//                 subtask_priorityId:1
//             },
//             {
//                 subtask_id: '3',
//                 subtask_name: "test1_3",
//                 subtask_done: false,
//                 subtask_priorityId:2
//             },
//         ],
//     },
//     {
//         id: '2',
//         name: "test2",
//         done: false,
//         date: "2024-01-12",
//         typeId: "3",
//         priorityId:2,
//         subtasks: [
//             {
//                 subtask_id: '4',
//                 subtask_name: "test2_1",
//                 subtask_done: false,
//                 subtask_priorityId:0
//             },
//         ],
//     },
//     {
//         id: '3',
//         name: "test3",
//         done: false,
//         date: "2024-01-12",
//         typeId: "5",
//         priorityId:3,
//         subtasks: [],
//     },
//     {
//         id: '4',
//         name: "test3",
//         done: false,
//         typeId: "1",
//         date: "2024-01-12",
//         subtasks: [],
//         priorityId:4,
//     },
// ];

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
