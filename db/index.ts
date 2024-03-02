import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import type { SubTask, Task } from '@src/interfaces';


// const loadDatabase = async()=>{
//   const dbName = "Deal.db"
//   const dbAsset = require("./assets/Deal.db")
//   const 
// }

// async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.SQLiteDatabase> {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + 'SQLite/Deal.db'
//   );
//   return SQLite.openDatabase('Deal.db');
// }


const deleteDatabase = async () => {
  try {
    const db = SQLite.openDatabase("Deal.db")
    // Close any existing connections to the database
    db.closeAsync();

    // Delete the database file
    db.deleteAsync();

    console.log('Database deleted successfully.');
  } catch (error) {
    console.error('Error deleting database:', error);
  }
};

export const createTables = async() => {
  // await deleteDatabase()
  const db = SQLite.openDatabase("Deal.db")
  
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS TASKS (
          id TEXT, name TEXT, done BOOLEAN, date TEXT, type TEXT, priorityId INTEGER
        );
    `);
    await tx.executeSqlAsync(`
      CREATE TABLE IF NOT EXISTS SUBTASKS (
        subtask_id TEXT, subtask_name TEXT, subtask_done BOOLEAN, task_id TEXT,
        FOREIGN KEY (task_id) REFERENCES TASKS(id)
      );
    `);
    await tx.executeSqlAsync(`
    CREATE TABLE IF NOT EXISTS TYPE_TASKS (
      id TEXT auto_increment, key TEXT,value TEXT, color TEXT
    );
  `);
  });
};

export const addTask = async({id:task_id,name, done, date,type,subtasks,priorityId=0}:Task)=>{
  const db = SQLite.openDatabase("Deal.db")
  
  await db.transactionAsync(async (tx) => {
    const result = await tx.executeSqlAsync(
      'INSERT INTO tasks VALUES (?, ?,?,?,?,?)',
      [task_id,name, String(done), date,type,Number(priorityId)]
    );
    console.log("task add", result);
    for(let i=0;i<subtasks.length;i++){
      let {subtask_id, subtask_name, subtask_done} = subtasks[i]
      await tx.executeSqlAsync(
        'INSERT INTO subtasks VALUES (?, ?,?,?)',
        [subtask_id,subtask_name, String(subtask_done),task_id]
      );
    }
  });
} 

export const addSubtaskDb = async({subtask_id, subtask_name, subtask_done}:SubTask,task_id:string)=>{
  const db = SQLite.openDatabase("Deal.db")
  await db.transactionAsync(async (tx) => {
    const result = await tx.executeSqlAsync(
      'INSERT INTO subtasks VALUES (?, ?,?, ?)',
      [subtask_id,subtask_name, String(subtask_done),task_id]
    );
    console.log("subtask add", result);
    
    
  });
} 



export const getTasks = async()=>{
  const db = SQLite.openDatabase("Deal.db")
  return new Promise((resolve)=>{
    db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync('SELECT * FROM TASKS', []);
      resolve(result.rows)
    });
  })
} 

export const getTasksWithSubtask = async()=>{
  const db = SQLite.openDatabase("Deal.db")
  return new Promise<unknown[]>((resolve)=>{
    db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(`
      SELECT * FROM TASKS LEFT OUTER JOIN subtasks on tasks.id = subtasks.task_id`, []);
      console.log("test result", result.rows);
      
      resolve(result.rows)
    });
  })
} 





// export const createTables = async()=>{
//   const db = SQLite.openDatabase('./assets/Deal.db')
//   await db.transaction(async (tx) => {
//     await tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)'
//     );
//   });
  
//   // Create the second table
//   await db.transaction(async (tx) => {
//     await tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS subtasks (id INTEGER PRIMARY KEY NOT NULL, age INTEGER NOT NULL)'
//     );
//   });
// }
// const readOnly = false;
// export const getTasks = async()=>{
//   const db = await openDatabase('Deal.db');
// 	await db.transactionAsync(async tx => {
// 		const result = await tx.executeSqlAsync('SELECT * FROM tasks', []);
// 		console.log('data:', result.rows[0]);
// 	}, readOnly);
// }
