import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import type { SortOption, Status, Task } from "../types/types";
import { addTask, deleteTask, editTask, getTasks } from "../api/TaskApi";
import TaskFormModal from "../components/TaskFormModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import Controls from "../components/Controls";

function TaskTracker() {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<Status | "All">("All");
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>({
    key: "dueDate",
    direction: "asc",
  });

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

  const handleToggleStatus = async (task: Task) => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "Pending" ? "Done" : "Pending",
    };

    try {
      await editTask(updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  const handleSaveTask = async (task: Omit<Task, "id"> | Task) => {
    if ("id" in task) {
      const updatedTask = await editTask(task);
      setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? task : t)));
    } else {
      const newTask = await addTask(task);
      setTasks((prev) => [newTask, ...prev]);
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
  };

  // filtering and sorting logics

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ? true : task.status === activeFilter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const { key, direction } = sortOption;

      if (key === "title") {
        return direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (key === "dueDate") {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });

  console.log(tasks, "tasks");

  return (
    <div className=" text-slate-800 dark:text-slate-200 w-full transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Header onAddTask={handleAddTaskClick} />
        <main className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <Controls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <TaskList
            tasks={filteredAndSortedTasks}
            onEdit={handleEditTaskClick}
            onDelete={handleDeleteTaskClick}
            onToggleStatus={handleToggleStatus}
          />
        </main>
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
