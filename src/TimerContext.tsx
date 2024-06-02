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

type contextType = {
    timerOn: boolean;
    setTimerOn: Dispatch<SetStateAction<boolean>>;
    setTimeEnd: Dispatch<SetStateAction<string>>;
    diff:number,
    timeEnd:string,
    setDiff:Dispatch<SetStateAction<number>>,
    setBeginTimer:Dispatch<SetStateAction<{timeOn:boolean,time:number}>>;
    beginTimer:{
        timeOn:boolean,
        time:number
    }
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
        time:0
    }
});

interface Props {
    children: React.ReactNode;
}
export const TimerProvider = ({ children }: Props) => {
    const [beginTimer,setBeginTimer] = useState({
        timeOn:false,
        time:0
    })
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
        setDiff(0)
        console.log("render ",diffPause,pausedBegin);
    },[timeEnd,beginTimer])
    useEffect(() => {
        if(!timeEnd)return
        if(!timerOn && diff){
            setPausedBegin(moment().toISOString())
        }
        if(timerOn && pausedBegin.length){
            setDifPause(prev=>prev + Math.abs(moment(moment()).diff(pausedBegin)) + 300)
            console.log("change dif because pause",diffPause);
            setPausedBegin("")
        }
        if (timerOn) startTimer();
        else {
            timer.current && clearInterval(timer.current)
        }
        return () => {
            timer.current && clearInterval(timer.current)
        };
    }, [timerOn,timeEnd,diffPause]);
    useEffect(()=>{
        clearPause()
        setTimeEnd("")
    },[])
    useEffect(()=>{
        if(diff<=0){
            timer.current && clearInterval(timer.current)
            setTimeEnd("")
            clearPause()
            setBeginTimer({
                timeOn:false,
                time:0
            })
        }
    },[diff])

    const startTimer = () => {
        timer.current = setInterval(()=>{
            const dif = moment(timeEnd).diff(moment(),'seconds') + Math.round(diffPause/1000);            
            if(dif>0) setDiff(dif);
            else setDiff(0)
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
                beginTimer
            }}>
            {children}
        </TimerContext.Provider>
    );
};
export const useBackgroundTimer = () => useContext(TimerContext);
