import React, { useEffect, useState } from 'react'
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
import GohomeBtn from '../atoms/GohomeBtn';
import SelectBox from '../atoms/SelectBox';


const TrashTodoList = () => {
  const { fetchTodos } = useFetchTodos();
  const [taskItems, setTaskItems] = useRecoilState(taskItemState)
  const [selectValue, setSelectValue] = useState('');
  const uid = useRecoilValue(userIdState)
  //firebaseからtaskを取得して、stateを更新

  const deleteTodo = async (postId: string) => {
    await deleteDoc(doc(db, 'todos', postId))
    fetchTodos(uid, true);
  }

  useEffect(() => {
    fetchTodos(uid, true);
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
  const selectOnChangeHandler = async (e: React.ChangeEvent<HTMLSelectElement>, postId: string) => {
    const changeSelectValue = e.target.value;
    setSelectValue(changeSelectValue);
    const docRef = doc(db, 'todos', postId)
    await updateDoc(docRef, {
      status: changeSelectValue
    });
    fetchTodos(uid, false);
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
              <SelectBox selectValue={todo.status} onChange={(e) => { selectOnChangeHandler(e, todo.id) }} />
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
      <Box textAlign={'right'}>
        <GohomeBtn />
      </Box>
    </>
  )

}

export default TrashTodoList