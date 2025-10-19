import type { SortOption, Status } from "../types/types";
import SearchIcon from "./icons/SearchIcon";
import SortAscIcon from "./icons/SortAscIcon";
import SortDescIcon from "./icons/SortDescIcon";

interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: Status | "All";
  setActiveFilter: (filter: Status | "All") => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const filterOptions: (Status | "All")[] = ["All", "Pending", "Done"];
const sortKeys: { value: SortOption["key"]; label: string }[] = [
  { value: "dueDate", label: "Due Date" },
  { value: "title", label: "Title" },
];

function Controls({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  sortOption,
  setSortOption,
}: ControlsProps) {
  const handleSortKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption({ ...sortOption, key: e.target.value as SortOption["key"] });
  };

  const toggleSortDirection = () => {
    setSortOption({
      ...sortOption,
      direction: sortOption.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4 sm:flex-row sm:justify-between w-full bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
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

        {/* Filter Buttons */}
        <div className="flex-1 grid grid-cols-3 gap-2 bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`!px-3 !py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 ${
                activeFilter === filter
                  ? "!bg-white dark:!bg-slate-600 text-brand-primary dark:!text-white shadow"
                  : "!bg-transparent text-slate-600 dark:text-slate-300 hover:!bg-slate-300/50 dark:hover:!bg-slate-600/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Controls */}
      <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center gap-2">
        <select
          value={sortOption.key}
          onChange={handleSortKeyChange}
          className="w-full sm:w-auto px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          {sortKeys.map((key) => (
            <option key={key.value} value={key.value}>
              {key.label}
            </option>
          ))}
        </select>

        <button
          onClick={toggleSortDirection}
          className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:!bg-slate-700  dark:hover:!bg-slate-600 focus:!outline-none focus:!ring-2 focus:!ring-brand-primary"
        >
          {sortOption.direction === "asc" ? (
            <SortAscIcon className="h-5 w-5" />
          ) : (
            <SortDescIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Controls;
