export type Status = 'Pending' | 'Done';

export type Task = {
    id: string;
    title: string;
    dueDate: string;
    status: Status;
}