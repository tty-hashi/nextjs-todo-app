import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from '../../firebase/firebase-settings';
import { useSetRecoilState } from 'recoil';
import { taskItemState } from '../../states/state';
import { TodoType } from '../types/types';

export const useFetchTodos = () => {
  const setTaskItems = useSetRecoilState(taskItemState)
  //firebaseからtaskを取得して、stateを更新
  const fetchTodos = async (uid: string, isComplete?: boolean, todoStatus?: string) => {
    const todo = query(collection(db, 'todos'), where('uid', '==', uid));
    const querySnapshot = await getDocs(todo);
    const todos: TodoType[] = [];
    console.log('fetch1');
    try {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        todos.push({
          id: doc.id,
          content: data.content,
          detail: data.detail,
          createdAt: data.createdAt,
          status: data.status,
          isComplete: data.isComplete,
        });
      });
    } catch (e) {
      console.log("firebese fetch erro", e);
    }
    // setTaskItems(todos)
    console.log(todos);

    if (isComplete) {
      setTaskItems([...todos.filter(({ isComplete }) => isComplete)]);
    } else if ((!todoStatus || todoStatus === 'all') && !isComplete) {
      setTaskItems([...todos.filter(({ isComplete }) => !isComplete)]);
    } else {
      setTaskItems([...todos.filter(({ status }) => status === todoStatus)]);
    }
    console.log('fetch3');

  }
  return { fetchTodos }
}

