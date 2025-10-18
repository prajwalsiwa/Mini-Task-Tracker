import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import type { Task } from "../types/types";
import { addTask, deleteTask, editTask, getTasks } from "../api/TaskApi";
import TaskFormModal from "../components/TaskFormModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function TaskTracker() {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

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

  const handleDeleteTaskClick = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
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

  const handleConfirmDelete = async (taskId: string) => {
          try {
            await deleteTask(taskId);
            setTasks((prev) => prev.filter((t) => t.id !== taskId));
          } catch (err) {
            console.error(err);
          } finally {
            setIsDeleteModalOpen(false);
            setTaskToDelete(null);
          }
        }

  console.log(tasks, "tasks");

  return (
    <div className=" text-slate-800 dark:text-slate-200 w-full transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Header onAddTask={handleAddTaskClick} />
        <div className=" bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <TaskList tasks={tasks} onEdit={handleEditTaskClick} onDelete={handleDeleteTaskClick} />
        </div>
      </div>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        task={taskToDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default TaskTracker;
