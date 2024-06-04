import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useRef,
} from "react";
import { useAppSelector } from "./store/hook";

type contextType = {
    timerOn: boolean;
    setTimerOn: Dispatch<SetStateAction<boolean>>;
    setTimeEnd: Dispatch<SetStateAction<string>>;
    diff:number,
    timeEnd:string,
    setDiff:Dispatch<SetStateAction<number>>,
    setBeginTimer:Dispatch<SetStateAction<{timeOn:boolean,time:number,timePause:number}>>;
    beginTimer:{
        timeOn:boolean,
        time:number,
        timePause:number
    }
    setDifPause:Dispatch<SetStateAction<number>>
    setPausedBegin:Dispatch<SetStateAction<string>>
};
const TimerContext = createContext<contextType>({
    timerOn: false,
    setTimerOn: () => {},
    setTimeEnd: () => {},
    timeEnd:'',
    diff:0,
    setDiff:()=>{},
    setBeginTimer:()=>{},
    beginTimer:{
        timeOn:false,
        time:0,
        timePause:0
    },
    setDifPause:()=>{},
    setPausedBegin:()=>{}
});

interface Props {
    children: React.ReactNode;
}
export const TimerProvider = ({ children }: Props) => {
    const [beginTimer,setBeginTimer] = useState({
        timeOn:false,
        time:0,
        timePause:0
    })
    let { nameTask } = useAppSelector((state) => state.dealSettings);
    const [timerOn, setTimerOn] = useState(false);
    const [timeEnd, setTimeEnd] = useState("");
    const [pausedBegin, setPausedBegin] = useState("");
    const [diff,setDiff] = useState(0)
    const [diffPause, setDifPause] = useState(0)
    const timer = useRef<ReturnType<typeof setInterval> | null>(null)
    const clearPause = ()=>{
        setDifPause(0)
        setPausedBegin("")
    }

    useEffect(()=>{
        console.log("что пришло", nameTask, timerOn, timeEnd, diffPause, pausedBegin);
        
        if(!beginTimer.time && !nameTask.length && !timeEnd.length)return
        console.log("Где могло измениться имя задачи", nameTask);
        
        AsyncStorage.setItem("timerInfo",JSON.stringify({
            timerOn, timeEnd, diffPause, pausedBegin, nameTask:nameTask || "Задание не найдено"
        }))
    },[timerOn, timeEnd, diffPause, pausedBegin,nameTask])

    useEffect(() => {
        console.log("render ", beginTimer);
        if (!diff && beginTimer.time>0) {
            console.log("diff 0");
            setDiff(beginTimer.time);
            setDifPause(beginTimer.timePause * 1000)
        }
        else if (
            timeEnd.length &&
            moment(timeEnd).diff(moment(), "seconds") > 0
        ) {
            console.log("timeEnd.length");
            setDiff(moment(timeEnd).diff(moment(), "seconds") + Math.round((diffPause ||0)/1000) + moment().diff(moment(pausedBegin),'seconds') );
        } 
        // else {
        //     setDiff(0);
        //     setDifPause(0);
        // }
    }, [timeEnd, beginTimer]);

    // useEffect(()=>{
    //     if(timerOn){
    //         timer.current && clearInterval(timer.current)
    //     }
    // },[timerOn])

    useEffect(() => {
        console.log("Главный useEffect", timerOn,timeEnd,timeEnd.length, moment().toISOString());
        
        if(!timeEnd.length)return
        if(!timerOn && diff && !pausedBegin.length){
            setPausedBegin(moment().toISOString())
            timer.current && clearInterval(timer.current)
        }
        if(timerOn && pausedBegin.length){
            setDifPause(prev=>prev + Math.abs(moment(moment()).diff(pausedBegin)) + 300)
            console.log("change dif because pause",diffPause);
            setPausedBegin("")
        }
        console.log("Прошли по условию", timerOn);
        
        if (timerOn){
            startTimer();
            console.log("Таймер начался");
            
        } 
        else {
            timer.current && clearInterval(timer.current)
        }
        return () => {
            timerOn && timer.current && clearInterval(timer.current)
        };
    }, [timerOn,timeEnd,diffPause]);
    useEffect(()=>{
        clearPause()
        setTimeEnd("")
    },[])
    useEffect(()=>{
        if(diff<=0){
            timer.current && clearInterval(timer.current)
            // setTimeEnd("")
            clearPause()
            // setBeginTimer({
            //     timeOn:false,
            //     time:0
            // })
        }
    },[diff,timeEnd])

    const startTimer = () => {
        timer.current = setInterval(()=>{
            const dif = moment(timeEnd).diff(moment(),'seconds') + Math.round(diffPause/1000);            
            if(dif>0) setDiff(dif);
            else setDiff(0)
            // console.log("Это интервал", diff, dif);
        },500)
    };

    return (
        <TimerContext.Provider
            value={{
                timerOn,
                setTimerOn,
                setTimeEnd,
                timeEnd,
                diff,
                setDiff,
                setBeginTimer,
                beginTimer,
                setDifPause,
                setPausedBegin
            }}>
            {children}
        </TimerContext.Provider>
    );
};
export const useBackgroundTimer = () => useContext(TimerContext);
