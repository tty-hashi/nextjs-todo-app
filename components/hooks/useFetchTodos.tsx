import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from '../../firebase/firebase-settings';
import { useRecoilState } from 'recoil';
import { taskItemState, userIdState } from '../../states/state';
import { TodoType } from '../types/types';

export const useFetchTodos = () => {
  const [taskItems, setTaskItems] = useRecoilState(taskItemState);
  //firebaseからtaskを取得して、stateを更新
  const fetchTodos = async (uid: string, todoStatus?: string) => {
    const todo = query(collection(db, 'todos'), where('uid', '==', uid));
    const querySnapshot = await getDocs(todo);
    const todos: TodoType[] = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        status: doc.data().status
      });
    });
    if (!todoStatus || todoStatus === 'all') {
      setTaskItems([...todos]);
    } else {
      setTaskItems([...todos.filter(({ status }) => status === todoStatus)]);
    }
  }
  return { fetchTodos }

}

