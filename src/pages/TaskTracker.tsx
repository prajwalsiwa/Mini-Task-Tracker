import { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import type { SortOption, Status, Task } from "../types/types";
import { addTask, deleteTask, editTask, getTasks } from "../api/TaskApi";
import TaskFormModal from "../components/TaskFormModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import Controls from "../components/Controls";
import { useDebounce } from "../hooks/useDebounce";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  const { toast, showToast, hideToast } = useToast();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks as Task[]);
      } catch (err) {
        showToast("Failed to fetch tasks", "error");
        console.error(err);
      }
    };

    fetchTasks();
  }, [showToast]);

  // Handlers
  const handleAddTaskClick = useCallback(() => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  }, []);

  const handleEditTaskClick = useCallback((task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }, []);

  const handleDeleteTaskClick = useCallback((task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  }, []);

  const handleToggleStatus = useCallback(async (task: Task) => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "Pending" ? "Done" : "Pending",
    };

    try {
      await editTask(updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
      showToast("Task status updated", "success");
    } catch (err) {
      console.error("Failed to toggle status", err);
      showToast("Failed to update status", "error");
    }
  }, [showToast]);

  const handleSaveTask = useCallback(async (task: Omit<Task, "id"> | Task) => {
    try {
      if ("id" in task) {
        const updatedTask = await editTask(task);
        setTasks((prev) =>
          prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
        showToast("Task updated successfully", "success");
      } else {
        const newTask = await addTask(task);
        setTasks((prev) => [newTask, ...prev]);
        showToast("Task added successfully", "success");
      }
    } catch (err) {
      showToast("Something went wrong!", "error");
      console.error(err);
    } finally {
      setIsModalOpen(false);
    }
  }, [showToast]);

  const handleConfirmDelete = useCallback(async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      showToast("Task deleted successfully", "info");
    } catch {
      showToast("Failed to delete task", "error");
    } finally {
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  }, [showToast]);

  // filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
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
  }, [tasks, debouncedSearchTerm, activeFilter, sortOption]);

  return (
    <div className="dark:text-slate-200 w-full transition-colors duration-300">
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
          <div className="max-h-[30rem] overflow-y-auto">
            {filteredAndSortedTasks.length > 0 ? (
              <TaskList
                tasks={filteredAndSortedTasks}
                onEdit={handleEditTaskClick}
                onDelete={handleDeleteTaskClick}
                onToggleStatus={handleToggleStatus}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center text-slate-500 dark:text-slate-400">
                <p className="text-lg font-medium">No tasks found</p>
                <p className="mt-2 text-sm">
                  Try adjusting your search or filter, or add a new task!
                </p>
              </div>
            )}
          </div>
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
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast message={toast.message} type={toast.type} onClose={hideToast} />
        </div>
      )}
    </div>
  );
}

export default TaskTracker;
