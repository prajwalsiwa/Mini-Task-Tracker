import PlusIcon from "./icons/PlusIcon";
import LogoIcon from "./icons/LogoIcon";

interface HeaderProps {
  onAddTask: () => void;
}

function Header({ onAddTask }: HeaderProps) {
  const handleAddTask = () => {
    onAddTask();
  };
  return (
    <header className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <LogoIcon className="h-8 w-8 text-brand-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Task Tracker
        </h1>
      </div>
      <button
        onClick={onAddTask}
        className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 transition-all duration-200"
      >
        <PlusIcon className="w-5 h-5" />
        <span className="hidden sm:inline" onClick={handleAddTask}>
          Add Task
        </span>
      </button>
    </header>
  );
}

export default Header;
