import CheckCircleIcon from "./icons/CheckCircleIcon";
import ClockIcon from "./icons/ClockIcon";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";

interface TaskItemProps {
  id: string;
  title: string;
  dueDate: string;
  status: string;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

function TaskItem({ title, dueDate, status, id }: TaskItemProps) {
  console.log(status);
  const overDue =
    status === "Pending" &&
    new Date(dueDate) < new Date(new Date().toDateString());

  console.log(overDue, id);

  return (
    <li className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 cursor-pointer">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center  bg-green-200  text-gray-600 ${
            status !== "Done" && "bg-orange-200"
          }`}
        >
          {status === "Done" ? (
            <CheckCircleIcon className="w-5 h-5" />
          ) : (
            <ClockIcon className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </p>
          <p
            className={`text-sm  ${
              overDue ? "text-red-500 font-semibold" : "text-slate-500"
            }`}
          >
            Due: {formatDate(dueDate)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          className="p-2  text-slate-500  bhover:text-brand-primary dark:hover:text-brand-secondary !rounded-full !bg-slate-500 hover:!bg-slate-200 dark:!hover:bg-slate-600 transition-colors duration-200"
          aria-label="Edit task"
        >
          <EditIcon className="w-5 h-5 text-white hover:text-slate-500" />
        </button>
        <button
          className="p-2 text-slate-500 !rounded-full  !bg-slate-500 hover:!bg-slate-200 dark:hover:bg-slate-600 hover:text-red-500 transition-colors duration-200"
          aria-label="Delete task"
        >
          <TrashIcon className="w-5 h-5 hover:text-red-500 text-white" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
