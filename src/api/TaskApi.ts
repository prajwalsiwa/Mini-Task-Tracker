import type { Tasks } from "../types/types";

const STORAGE_KEY = "tasks";
const API_DELAY = 300;

const getInitialTasks = (): Tasks[] => {
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

//mock api for get tasks 

export const getTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getStoredTask();
      resolve(tasks);
    }, API_DELAY);
  });
};

