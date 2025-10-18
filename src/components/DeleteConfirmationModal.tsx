import type { Task } from "../types/types";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  task: Task | null;
  onCancel: () => void;
  onConfirm: (taskId: string) => void;
}

function DeleteConfirmationModal({
  isOpen,
  task,
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen || !task) return null;

  const handleConfirm = () => {
    onConfirm(task.id);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Confirm Delete
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Are you sure you want to delete "{task.title}"?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2  dark:bg-slate-600 text-slate-800 dark:text-white rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 !bg-red-600 text-white rounded-lg"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
