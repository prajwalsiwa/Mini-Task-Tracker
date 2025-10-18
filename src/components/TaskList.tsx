import type { Task } from "../types/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[] | [];
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {tasks.map((tasks) => (
        <TaskItem
          title={tasks.title}
          dueDate={tasks.dueDate}
          status={tasks.status}
          id={tasks.id}
        />
      ))}
    </div>
  );
}

export default TaskList;
