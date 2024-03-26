import * as SQLite from 'expo-sqlite';
import type { SubTask, Task } from '@src/interfaces';
import { defaultTypeTasks } from '@src/utils/dataNoFetch';




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
  const db = SQLite.openDatabase("Deal.db")
  // await deleteDatabase()
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS TASKS (
          id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, done BOOLEAN,
          date TEXT, typeId INTEGER, priorityId INTEGER
        );
    `);
    await tx.executeSqlAsync(`
      CREATE TABLE IF NOT EXISTS SUBTASKS (
        subtask_id INTEGER PRIMARY KEY AUTOINCREMENT, subtask_name TEXT,
        subtask_done BOOLEAN, task_id INTEGER, subtask_priorityId INTEGER,
        FOREIGN KEY (task_id) REFERENCES TASKS(id)
      );
    `);
    await tx.executeSqlAsync(`
      CREATE TABLE IF NOT EXISTS TYPE_TASKS (
        id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT, color TEXT
      );
    `);
    const countType = await tx.executeSqlAsync(`
    SELECT COUNT(*) countType FROM TYPE_TASKS
    `)
    if(!countType.rows[0].countType){
      for(let i=0;i<defaultTypeTasks.length;i++){
        await tx.executeSqlAsync(
          'INSERT INTO TYPE_TASKS(value, color) VALUES (?, ?)',
          [defaultTypeTasks[i].value,defaultTypeTasks[i].color]
        );
      }

    }
  });
};

export const addTask = async({name, done, date,typeId,subtasks}:Task)=>{
  const db = SQLite.openDatabase("Deal.db")
  
  await db.transactionAsync(async (tx) => {
    let priorityId = 0
    const priorityIdQuery = await tx.executeSqlAsync(
      'select max(priorityId) priority from tasks where date=?',[date]
    )
    console.log("priority", priorityIdQuery);
    
    if(priorityIdQuery.rows[0].priority!=null){
      priorityId = priorityIdQuery.rows[0].priority + 1
    }
    const task = await tx.executeSqlAsync(
      'INSERT INTO tasks(name,done,date,typeId, priorityId) VALUES (?, ?,?,?,?)',
      [name, String(done), date,typeId,Number(priorityId)]
    );
    console.log("created task", task);
    
    if(!task.insertId)return
    for(let i=0;i<subtasks.length;i++){
      let {subtask_name, subtask_done} = subtasks[i]
      await tx.executeSqlAsync(
        'INSERT INTO subtasks(subtask_name, subtask_done, task_id,subtask_priorityId) VALUES (?,?,?,?)',
        [subtask_name, String(subtask_done),task.insertId,i]
      );
    }
  });
} 

export const addSubtaskDb = async({subtask_name, subtask_done}:SubTask,task_id:number)=>{
  const db = SQLite.openDatabase("Deal.db")
  let priorityId = 0
  await db.transactionAsync(async (tx) => {
    const priorityIdQuery = await tx.executeSqlAsync(
      'select max(subtask_priorityId) priority from subtasks where task_id=?',[task_id]
    )
    if(priorityIdQuery.rows[0].priority!=null){
      priorityId = priorityIdQuery.rows[0].priority + 1
    }
    console.log(priorityId);
    const taskData = await tx.executeSqlAsync(
      'select * from tasks where id=?',[task_id]
    )
    if(taskData.rows[0].done && !subtask_done){
      const updateTask = await tx.executeSqlAsync(
        `update TASKS set done=false where id=?`,
        [task_id]
      );
      console.log("updated status task", updateTask);
    }
  
    
    const result = await tx.executeSqlAsync(
      'INSERT INTO subtasks(subtask_name, subtask_done, task_id,subtask_priorityId) VALUES (?, ?,?, ?)',
      [subtask_name, String(subtask_done),task_id,priorityId]
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

export const getTypeTask = async()=>{
  const db = SQLite.openDatabase("Deal.db")
  return new Promise<unknown[]>((resolve)=>{
    db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync('SELECT id key, value, color FROM TYPE_TASKS', []);
      console.log(result.rows);
      
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
      resolve(result.rows)
    });
  })
} 

export const deleteTaskDb = async(task_id:number)=>{
  const db = SQLite.openDatabase("Deal.db")
  db.transactionAsync(async (tx) => {
    const result = await tx.executeSqlAsync(`
    delete FROM SUBTASKS where task_id=?`, [task_id]);
    console.log("Удаление подзадач", result);
    const result1 = await tx.executeSqlAsync(`
    delete FROM TASKS where id=?`, [task_id]);
    console.log("Удаление задач", result1);
  });
}

export const deleteSubtaskDb = async(subtask_id:number)=>{
  const db = SQLite.openDatabase("Deal.db")
    db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(`
      delete FROM SUBTASKS where subtask_id=?`, [subtask_id]);
      console.log("Удаление подзадач", result);
    });
}

export const setOrderTask = async(tasks:Task[])=>{
  const db = SQLite.openDatabase("Deal.db")

    db.transactionAsync(async (tx) => {
      for(let i=0; i<tasks.length;i++){
        const result = await tx.executeSqlAsync(`
        update TASKS set priorityId=? where id=?`, [i, tasks[i].id]);
        console.log("Изменение порядка задач", result);
      }
  })
}

export const setOrderSubtask = async(subtasks:SubTask[])=>{
  const db = SQLite.openDatabase("Deal.db")
    console.log("arr subtask before order", subtasks);
    
    db.transactionAsync(async (tx) => {
      for(let i=0; i<subtasks.length;i++){
        const result = await tx.executeSqlAsync(`
        update SUBTASKS set subtask_priorityId=? where subtask_id=?`, [i, subtasks[i].subtask_id]);
        console.log("Изменение порядка подзадач", result);
      }
  })
}

export const updateTask = async(task:Task)=>{
  const db = SQLite.openDatabase("Deal.db")
    const {id, name, done,typeId} = task
    db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync(`
      update TASKS set name=?, done=?,typeId=? where id=?
      `, [name, String(done),typeId,id]);  
  })
}

export const updateSubtask = async(subtask:SubTask)=>{
  const db = SQLite.openDatabase("Deal.db")
    const {subtask_id, subtask_name, subtask_done} = subtask
    db.transactionAsync(async (tx) => { 
      await tx.executeSqlAsync(`
      update SUBTASKS set subtask_name=?, subtask_done=? where subtask_id=?
      `, [subtask_name, String(subtask_done),subtask_id]);    
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
