import type { Status } from "../types/types";
import SearchIcon from "./icons/SearchIcon";

interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: Status | "All";
  setActiveFilter: (filter: Status | "All") => void;
}

const filterOptions: (Status | "All")[] = ["All", "Pending", "Done"];

function Controls({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}: ControlsProps) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        {/* Filters & Sorting */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter Buttons */}
          <div className="flex-1 grid grid-cols-3 gap-2 bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`!px-3 !py-1.5 text-sm !bg-transparent !outline-0 !border-transparent  font-semibold rounded-md transition-colors duration-200 ${
                  activeFilter === filter
                    ? "!bg-white dark:!bg-slate-600 text-brand-primary dark:!text-white shadow"
                    : "!text-slate-600 !bg-none dark:!text-slate-300 hover:!bg-slate-300/50 dark:hover:!bg-slate-600/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controls;
