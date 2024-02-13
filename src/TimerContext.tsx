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
    setBeginTimer:Dispatch<SetStateAction<boolean>>;
};
const TimerContext = createContext<contextType>({
    timerOn: false,
    setTimerOn: () => {},
    setTimeEnd: () => {},
    timeEnd:'',
    diff:0,
    setDiff:()=>{},
    setBeginTimer:()=>{}
});

interface Props {
    children: React.ReactNode;
}
export const TimerProvider = ({ children }: Props) => {
    const [beginTimer,setBeginTimer] = useState(false)
    const [timerOn, setTimerOn] = useState(false);
    const [timeEnd, setTimeEnd] = useState("");
    const [pausedBegin, setPausedBegin] = useState("");
    const [diff,setDiff] = useState(0)
    // const diffRef = useRef(0)
    const [diffPause, setDifPause] = useState(0)
    const timer = useRef<ReturnType<typeof setInterval> | null>(null)
    // console.log(timeEnd);
    
    useEffect(()=>{
        setDifPause(0)
        // diffRef.current = 0
        setPausedBegin("")
        setDiff(0)
        // console.log("diff ref change ",diffRef.current);
        console.log("render ",diffPause,pausedBegin);
        
        
    },[timeEnd,beginTimer])
    useEffect(() => {
        if(!timeEnd)return
        if(!timerOn && diff){
            setPausedBegin(moment().toISOString())
        }
        if(timerOn && pausedBegin.length){
            setDifPause(prev=>prev+Math.abs(moment(moment()).diff(pausedBegin,'seconds')))
            console.log("change dif because pause",diffPause);
            
            // diffRef.current += Math.abs(moment(moment()).diff(pausedBegin,'seconds'))
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
        setDifPause(0)
        // diffRef.current = 0
        setTimeEnd("")
        setPausedBegin("")
    },[])
    useEffect(()=>{
        if(diff<=0){
            timer.current && clearInterval(timer.current)
            // diffRef.current = 0
            setDifPause(0)
            setTimeEnd("")
            setPausedBegin("")
            setBeginTimer(false)
        }
    },[diff])

    const startTimer = () => {
        timer.current = setInterval(()=>{
            const dif = moment(timeEnd).diff(moment(),'seconds') + diffPause;            
            // const dif = moment(timeEnd).diff(moment(),'seconds') + diffRef.current;
            // console.log(moment(timeEnd).diff(moment()),moment(timeEnd).diff(moment())/1000,dif);
            // console.log(moment(timeEnd).toISOString(), moment().toISOString());
            // console.log(diffPause,beginTimer);
            
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
                setBeginTimer
            }}>
            {children}
        </TimerContext.Provider>
    );
};
export const useBackgroundTimer = () => useContext(TimerContext);
