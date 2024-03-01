import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import type { Task } from '@src/interfaces';


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


// const db = SQLite.openDatabase("Deal.db");


export const createTables = async() => {
  const db = SQLite.openDatabase("Deal.db")

  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER, name TEXT, done BOOLEAN, date TEXT, type TEXT, priorityId
        );
    `);
    await tx.executeSqlAsync(`
      CREATE TABLE IF NOT EXISTS subtasks (
        id INTEGER, name TEXT, done BOOLEAN
      );
    `);
    await tx.executeSqlAsync(`
    CREATE TABLE IF NOT EXISTS typeTask (
      id INTEGER, key TEXT,value TEXT, color TEXT
    );
  `);
  });
};

export const addTask = async({id,name, done, date,type,priorityId}:Task)=>{
  const db = SQLite.openDatabase("Deal.db")
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      'INSERT INTO tasks VALUES (?, ?,?,?,?,?)',
      [id,name, String(done), date,type,Number(priorityId)]
    );
  });
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
