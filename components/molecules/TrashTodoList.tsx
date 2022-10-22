import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchTodos } from '../hooks/useFetchTodos';
import { faDeleteLeft, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Box, Flex, Heading, ListItem, Select, Spacer, UnorderedList } from '@chakra-ui/react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { taskItemState, userIdState } from '../../states/state';
import { db } from '../../firebase/firebase-settings';
import Btn from '../atoms/Btn';
import { useRouter } from 'next/router';


const TrashTodoList = () => {
  const { fetchTodos } = useFetchTodos();
  const [taskItems, setTaskItems] = useRecoilState(taskItemState)
  const uid = useRecoilValue(userIdState)
  //firebaseからtaskを取得して、stateを更新

  const deleteTodo = async (postId: string) => {
    await deleteDoc(doc(db, 'todos', postId))
    fetchTodos(uid, true);
  }

  useEffect(() => {
    fetchTodos(uid, true);
    console.log(taskItems);
  }, [])

  //編集ボタンをクリックしたら、editigページへpostidをクエリパラメータとして遷移する。
  const router = useRouter();
  const returnTodo = async (postId: string) => {
    const docRef = doc(db, 'todos', postId)
    await updateDoc(docRef, {
      isComplete: false
    });
    fetchTodos(uid, true);
    router.push({
      pathname: "/",   //遷移先
    });
  }

  return (
    <>
      <Heading as='h2' size='md' pt={10} color='red.900' >ゴミ箱</Heading>
      <UnorderedList pt={10}>
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
              <Btn onClickHandler={() => { returnTodo(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faTrashCanArrowUp} />
              </Btn>
              <Btn onClickHandler={() => { deleteTodo(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faDeleteLeft} />
              </Btn>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  )

}

export default TrashTodoList