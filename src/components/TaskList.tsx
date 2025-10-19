import type { Task } from "../types/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[] | [];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
}

function TaskList({ tasks, onEdit, onDelete, onToggleStatus }: TaskListProps) {
  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {tasks.map((tasks) => (
        <TaskItem
          task={tasks}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;
