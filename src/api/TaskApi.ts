import type { Task } from "../types/types";

const STORAGE_KEY = "tasks";
const API_DELAY = 300;

const getInitialTasks = (): Task[] => {
  return [
    {
      id: "1",
      title: "Design the new dashboard",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "Pending",
    },
    {
      id: "2",
      title: "Implement the login page",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Done",
    },
    {
      id: "3",
      title: "Fix bug #123 on production",
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "Pending",
    },
  ];
};

const getStoredTask = () => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  const initialTasks = getInitialTasks();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
  return initialTasks;
};

const saveTask = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error("Error saving tasks to localStorage", err);
  }
};

//mock api for get tasks

export const getTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getStoredTask();
      resolve(tasks);
    }, API_DELAY);
  });
};

// mock api for adding tasks

export const addTask = (
  newTaskData: Omit<Task, "id" | "status">
): Promise<Task> => {
  const tasks = getStoredTask();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newTask: Task = {
        ...newTaskData,
        id: Date.now().toString(),
        status: "Pending",
      };

      if (tasks.some((task: Task) => task.id === newTask.id)) {
        return reject(new Error("Task already exists"));
      }

      const updatedTasks = [newTask, ...tasks];
      saveTask(updatedTasks);
      resolve(newTask);
    }, API_DELAY);
  });
};

export const editTask = (taskData: Task): Promise<Task> => {
  const tasks = getStoredTask();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskExists = tasks.some((t: Task) => t.id === taskData.id);

      if (!taskExists) {
        return reject(new Error("Task not found"));
      }

      const updatedTasks = tasks.map((t: Task) =>
        t.id === taskData.id ? taskData : t
      );

      saveTask(updatedTasks);
      resolve(taskData);
    }, API_DELAY);
  });
};

export const deleteTask = (taskId: string): Promise<string> => {
  const tasks = getStoredTask();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskExists = tasks.some((t: Task) => t.id === taskId);

      if (!taskExists) {
        return reject(new Error("Task not found"));
      }

      const updatedTasks = tasks.filter((t: Task) => t.id !== taskId);
      saveTask(updatedTasks);
      resolve(taskId);
    }, API_DELAY);
  });
};
