import { ITypeTask } from './../interfaces';
export const defaultTypeTasks:ITypeTask[] = [
        { key: 1, value: "Без категории", color: "#FFFCB9" },
        { key: 2, value: "Учёба", color: "rgb(189,254,248)" },
        { key: 3, value: "Работа", color: "rgb(204,204,254)" },
        { key: 4, value: "Спорт", color: "rgb(255,171,171)" },
        { key: 5, value: "Работа по дому", color: "rgb(194,239,154)" },
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
