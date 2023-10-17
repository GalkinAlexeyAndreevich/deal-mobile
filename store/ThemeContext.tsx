import React, {createContext, useContext,useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../config/theme';
import { IColors } from '../interfaces';
type contextType = {
    theme:string,
    colors:IColors
    toggleTheme:()=>void
}
const ThemeContext = createContext<contextType>({theme:'light',colors:Colors.light,toggleTheme:()=>{}});

interface Props {
    children: React.ReactNode;
  }
export const ThemeProvider = ({children}:Props) => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<string>(colorScheme || 'light');
  const [colors,setColors] = useState<IColors>(Colors.light)
  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if(savedTheme ==="dark" || savedTheme ==="light"){
          setTheme(savedTheme);
          console.log(savedTheme,"get");
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    getTheme();
  }, []);
  useEffect(()=>{
    if(theme==="light")setColors(Colors.light)
    else if(theme==="dark") setColors(Colors.dark)
    console.log(colors);
  },[theme])

  const toggleTheme = () => {
    const newTheme = theme == "dark"?"light":"dark"
    setTheme(newTheme);  
    AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme,colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = ()=>useContext(ThemeContext)