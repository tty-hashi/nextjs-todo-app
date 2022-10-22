import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { updateDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-settings';
import Btn from '../components/atoms/Btn';
import { Input, Textarea } from '@chakra-ui/react';


const Editing = () => {
  const router = useRouter();
  const postId: string = typeof router.query.postId === 'string' && router.query.postId;
  const [todoContent, setTodoContent] = useState('');
  const [todoDetail, setTodoDetail] = useState('');

  // 対象Todoの取得
  // const getTodo = async () => {
  //   const docRef = doc(db, "todos", postId);
  //   const docSnap = await getDoc(docRef);
  //   const todo: any = docSnap.data();
  //   setTodoContent(todo.content);
  //   setTodoDetail(todo.detail);
  // }
  (async () => {
    const docRef = doc(db, "todos", postId);
    const docSnap = await getDoc(docRef);
    const todo: any = docSnap.data();
    setTodoContent(todo.content);
    setTodoDetail(todo.detail);
  })()
  // アップデード関数
  const updateTodo = async () => {
    const docRef = doc(db, 'todos', postId)
    await updateDoc(docRef, {
      content: todoContent,
      detail: todoDetail,
      updateAt: serverTimestamp(),
    });
    setTodoContent('');
    setTodoDetail('');
    router.push({
      pathname: "/",   //遷移先
    });
  }

  return (
    <>
      {/* <Btn onClickHandler={getTodo}>レンダリング</Btn> */}
      <Input value={todoContent} onChange={e => { setTodoContent(e.target.value) }} my={4} />
      <Textarea value={todoDetail} onChange={e => { setTodoDetail(e.target.value) }} mb={4} />
      <Btn onClickHandler={updateTodo}>アップデード</Btn>
    </>
  )
}

export default Editing