import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { updateDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-settings';
import Btn from '../components/atoms/Btn';


const Editing = () => {
  const router = useRouter();
  const postId: string = typeof router.query.postId === 'string' && router.query.postId;
  // const postId: string = router.query.postId;
  const [todoContent, setTodoContent] = useState('');

  // 対象Todoの取得

  const getTodo = async () => {
    const docRef = doc(db, "todos", postId);
    const docSnap = await getDoc(docRef);
    const todo: any = docSnap.data();
    setTodoContent(todo.content);
  }
  useEffect(() => {
    getTodo();
  }, [])
  // getTodo();
  // アップデード関数
  const updateTodo = async () => {
    const docRef = doc(db, 'todos', postId)
    await updateDoc(docRef, {
      content: 'upDate2',
      updateAt: serverTimestamp(),
    })
  }

  return (
    <>
      <Btn onClickHandler={updateTodo}>アップデード</Btn>
      <Btn onClickHandler={getTodo}>レンダリング</Btn>
      <p>Todoのコンテント：{todoContent}</p>
    </>
  )
}

export default Editing