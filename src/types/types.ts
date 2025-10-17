export type Status = 'Pending' | 'Done';

export type Tasks = {
    id: string;
    title: string;
    dueDate: string;
    status: Status;
}