export type Status = 'Pending' | 'Done';

export type Task = {
    id: string;
    title: string;
    dueDate: string;
    status: Status;
}

export interface SortOption {
    key: keyof Pick<Task, 'title' | 'dueDate'>;
    direction: 'asc' | 'desc';
}