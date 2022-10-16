import { atom } from 'recoil'

export const userIdState = atom<string>({
  key: 'userIdState', //一意
  default: '', //初期値
})

export const todoInputState = atom<string>({
  key: 'todoInputState',
  default: '',
})

export const taskItemState = atom<Array<any>>({
  key: 'taskItems',
  default: [{ id: '', content: '', createdAt: '', status: 'noStarted' }]
})
