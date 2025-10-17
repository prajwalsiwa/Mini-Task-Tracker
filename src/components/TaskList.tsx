import TaskItem from "./TaskItem";

function TaskList() {
  return (
    <div>
      {Array.from({ length: 4 }).map(() => (
        <TaskItem />
      ))}
      <TaskItem />
    </div>
  );
}

export default TaskList;
