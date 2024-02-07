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
    setDiff:Dispatch<SetStateAction<number>>
};
const TimerContext = createContext<contextType>({
    timerOn: false,
    setTimerOn: () => {},
    setTimeEnd: () => {},
    diff:0,
    setDiff:()=>{},
});

interface Props {
    children: React.ReactNode;
}
export const TimerProvider = ({ children }: Props) => {
    const [timerOn, setTimerOn] = useState(false);
    const [timeEnd, setTimeEnd] = useState("");
    const [pausedBegin, setPausedBegin] = useState("");
    const [diff,setDiff] = useState(0)
    const diffRef = useRef(0)
    const timer = useRef<ReturnType<typeof setInterval> | null>(null)
    useEffect(() => {
        if(!timerOn && diff){
            setPausedBegin(moment().toISOString())
        }
        if(timerOn && pausedBegin.length){
            diffRef.current += Math.abs(moment(moment()).diff(pausedBegin,'seconds'))
            setPausedBegin("")
        }
        if (timerOn) startTimer();
        else {
            timer.current && clearInterval(timer.current)
        }
        return () => {
            timer.current && clearInterval(timer.current)
        };
    }, [timerOn,timeEnd]);
    useEffect(()=>{
        diffRef.current = 0
        setTimeEnd("")
        setPausedBegin("")
    },[])

    const startTimer = () => {
        timer.current = setInterval(()=>{            
            const dif = moment(timeEnd).diff(moment(),'seconds') + diffRef.current;
            if(dif>0) setDiff(dif);
            else setDiff(0)
            if(dif<=0) {
                timer.current && clearInterval(timer.current)
                diffRef.current = 0
                setTimeEnd("")
                setPausedBegin("")
            }
        },500)
    };

    return (
        <TimerContext.Provider
            value={{
                timerOn,
                setTimerOn,
                setTimeEnd,
                diff,
                setDiff,
            }}>
            {children}
        </TimerContext.Provider>
    );
};
export const useBackgroundTimer = () => useContext(TimerContext);
