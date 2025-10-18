import type { Task } from "../types/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[] | [];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {tasks.map((tasks) => (
        <TaskItem task={tasks} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
