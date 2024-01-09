import React, {createContext, useContext,useState, useEffect, Dispatch, SetStateAction, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

type contextType = {
		secondsLeft:number,
		timerOn:boolean,
		setSecondsLeft:Dispatch<SetStateAction<number>>
    setTimerOn:Dispatch<SetStateAction<boolean>>;
}
const TimerContext = createContext<contextType>({secondsLeft:0,timerOn:false,setTimerOn:()=>{},setSecondsLeft:()=>{}});

interface Props {
    children: React.ReactNode;
}
export const TimerProvider = ({children}:Props) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

	const startTimer = () => {
		BackgroundTimer.runBackgroundTimer(() => {
			setSecondsLeft(secs => {
				if (secs > 0) return secs - 1
				else return 0
			})
		}, 1000)
	}
  useEffect(() => {
    console.log(secondsLeft);
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
  }, [secondsLeft])

  return (
    <TimerContext.Provider value={{secondsLeft,timerOn, setSecondsLeft,setTimerOn}}>
      {children}
    </TimerContext.Provider>
  );
};
export const useBackgroundTimer = ()=>useContext(TimerContext)