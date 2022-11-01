import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updateDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-settings";
import Btn from "../components/atoms/Btn";
import { Box, Input, Textarea } from "@chakra-ui/react";
import GohomeBtn from "../components/atoms/GohomeBtn";

const Editing = () => {
  const router = useRouter();
  const [todoContent, setTodoContent] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId')
    setPostId(postId)

    const getTodo = async () => {
      const docRef = doc(db, "todos", postId);
      await getDoc(docRef).then((doc) => {
        const todo = doc.data();
        setTodoContent(todo.content);
        setTodoDetail(todo.detail);
      });
    };
    getTodo();
  }, []);

  // アップデード関数
  const updateTodo = async () => {
    const docRef = doc(db, "todos", postId);
    await updateDoc(docRef, {
      content: todoContent,
      detail: todoDetail,
      updateAt: serverTimestamp(),
    });
    setTodoContent("");
    setTodoDetail("");
    router.push({
      pathname: "/", //遷移先
    });
  };

  return (
    <>
      <Input
        value={todoContent}
        onChange={(e) => {
          setTodoContent(e.target.value);
        }}
        my={4}
      />
      <Textarea
        value={todoDetail}
        onChange={(e) => {
          setTodoDetail(e.target.value);
        }}
        mb={4}
      />
      <Box textAlign={'right'}>
        <GohomeBtn mr={4} />
        <Btn onClickHandler={updateTodo}>アップデード</Btn>
      </Box>
    </>
  );
};

export default Editing;