export type TodoType = {
  id: string;
  content: string;
  createdAt: string;
  status: 'noStarted' | 'inProgress' | 'done';
  isComplete?: boolean;
  detail?: string;
}

export const selectList = [
  { id: 'noStarted', value: ' 未着手' },
  { id: 'inProgress', value: '実行中' },
  { id: 'done', value: '完了' }
]