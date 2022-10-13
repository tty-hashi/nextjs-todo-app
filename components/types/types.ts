export type TodoType = {
  id: string;
  content: string;
  createdAt: string;
  status: 'noStarted' | 'inProgress' | 'done';
}