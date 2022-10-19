import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { taskItemState, userIdState } from '../../states/state';
import { useFetchTodos } from '../hooks/useFetchTodos';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { Box, Flex, ListItem, Select, Spacer, UnorderedList } from '@chakra-ui/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-settings';
import Btn from '../atoms/Btn';
import { useRouter } from 'next/router';

const TodoList = () => {
  const { fetchTodos } = useFetchTodos();
  const taskItems = useRecoilValue(taskItemState)
  const uid = useRecoilValue(userIdState)
  //firebaseからtaskを取得して、stateを更新

  const todoDelete = async (postId: string) => {
    console.log(postId);
    await deleteDoc(doc(db, 'todos', postId))
  }
  useEffect(() => {
    fetchTodos(uid);
  }, [uid, todoDelete])

  //編集ボタンをクリックしたら、editigページへpostidをクエリパラメータとして遷移する。
  const router = useRouter();
  const clickButton = (postId: string) => {
    router.push({
      pathname: "/editing",   //遷移先
      query: { postId: postId } //クエリパラメータ
    });

  }

  return (
    <>
      <UnorderedList>
        {taskItems.map(todo => (
          <ListItem display='flex' mb={4} key={todo.id}>
            <p>{todo.content}</p>
            <Spacer />
            <Flex alignItems='center'>
              <Select w={'100px'} marginRight={4}>
                <option value="nostarted">nostarted</option>
                <option value="inprogress">inprogress</option>
                <option value="done">done</option>
              </Select>
              <Btn onClickHandler={() => { clickButton(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faFilePen} />
              </Btn>
              <Btn onClickHandler={() => { todoDelete(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faTrash} />
              </Btn>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  )
}

export default TodoList