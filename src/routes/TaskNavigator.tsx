import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskPage from '@src/Pages/TaskPage';
import TaskOnDayPage from '@src/Pages/TaskOnDayPage';

export type TaskStackParamList= {
	TaskOnDayPage:  {dateNow?: string};
	OneTaskPage: { taskId: number,uniqueId:string,currentDate:string };
}


const Stack = createNativeStackNavigator<TaskStackParamList>();

export default function TaskNavigator(){
  return (
      <Stack.Navigator screenOptions={()=>({
				headerShown:false
			})}
			initialRouteName='TaskOnDayPage'>
        <Stack.Screen
          name="TaskOnDayPage"
          component={TaskOnDayPage}
          initialParams={{dateNow:new Date().toISOString()}}
        />
        <Stack.Screen name="OneTaskPage" component={TaskPage} />
      </Stack.Navigator>
  );
};