import Header from "../components/Header";

function TaskTracker() {
  return (
    <div className=" text-slate-800 dark:text-slate-200 w-full transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Header onAddTask={() => {}} />
      </div>
    </div>
  );
}

export default TaskTracker;
