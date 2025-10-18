import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import type { Task } from "../types/types";
import { getTasks } from "../api/TaskApi";

function TaskTracker() {
  const [tasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks as Task[]);
    };

    fetchTasks();
  }, []);

  console.log(tasks, "tasks");

  return (
    <div className=" text-slate-800 dark:text-slate-200 w-full transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Header onAddTask={() => {}} />
        <div className=" bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default TaskTracker;
