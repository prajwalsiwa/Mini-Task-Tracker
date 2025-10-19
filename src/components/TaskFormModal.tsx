import React, { useState, useEffect } from "react";
import type { Task } from "../types/types";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, "id"> | Task) => void;
  taskToEdit: Task | null;
}

function TaskFormModal({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}: TaskFormModalProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>(
    {}
  );

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDueDate(taskToEdit.dueDate);
    } else {
      setTitle("");
      setDueDate(new Date().toISOString().split("T")[0]);
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; dueDate?: string } = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!dueDate) newErrors.dueDate = "Due date is required.";

    if (Object.keys(newErrors).length > 0) return;

    const taskData = {
      title,
      dueDate,
      status: taskToEdit ? taskToEdit.status : "Pending",
    };

    if (taskToEdit) {
      onSave({ ...taskData, id: taskToEdit.id });
    } else {
      onSave(taskData);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {taskToEdit ? "Edit Task" : "Add New Task"}
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Title <span>*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.title
                    ? "border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary`}
                autoFocus
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Due Date <span>*</span>
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.dueDate
                    ? "border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary`}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-colors"
              >
                {taskToEdit ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskFormModal;
