import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import type { Task } from "../types/types";
import { addTask, editTask, getTasks } from "../api/TaskApi";
import TaskFormModal from "../components/TaskFormModal";

function TaskTracker() {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks as Task[]);
    };

    fetchTasks();
  }, []);

  const handleAddTaskClick = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTaskClick = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (task: Omit<Task, "id"> | Task) => {
    if ("id" in task) {
      const updatedTask = await editTask(task);
      setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? task : t)));
    } else {
      const newTask = await addTask(task);
      setTasks((prev) => [...prev, newTask]);
    }
    setIsModalOpen(false);
  };

  console.log(tasks, "tasks");

  return (
    <div className=" text-slate-800 dark:text-slate-200 w-full transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Header onAddTask={handleAddTaskClick} />
        <div className=" bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <TaskList tasks={tasks} onEdit={handleEditTaskClick} />
        </div>
      </div>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

export default TaskTracker;
