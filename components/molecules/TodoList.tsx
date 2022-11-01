import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { Box, Flex, ListItem, Spacer, Text, UnorderedList } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';

import { useFetchTodos } from '../hooks/useFetchTodos';
import { sortSelectValue, taskItemState, userIdState } from '../../states/state';
import { db } from '../../firebase/firebase-settings';
import Btn from '../atoms/Btn';
import { useRouter } from 'next/router';
import SelectBox from '../atoms/SelectBox';

const TodoList = () => {
  const { fetchTodos } = useFetchTodos();
  const [taskItems, setTaskItems] = useRecoilState(taskItemState)
  const selectSortValue = useRecoilValue(sortSelectValue)
  const uid = useRecoilValue(userIdState)
  const [selectValue, setSelectValue] = useState('');
  //firebaseからtaskを取得して、stateを更新

  const todoMoveTrashBox = async (postId: string) => {
    const docRef = doc(db, 'todos', postId)
    await updateDoc(docRef, {
      isComplete: true
    });
    fetchTodos(uid, false);
  }

  useEffect(() => {
    fetchTodos(uid);
  }, [uid])

  //編集ボタンをクリックしたら、editigページへpostidをクエリパラメータとして遷移する。
  const router = useRouter();
  const editingRouting = (postId: string) => {
    router.push({
      pathname: "/editing",   //遷移先
      query: { postId: postId } //クエリパラメータ
    });
  }
  const moveTrashPage = () => {
    router.push({
      pathname: "/trash",
    });
  }
  // todoのstatusを更新して、既存のsortValueでtodoを更新
  const selectOnChangeHandler = async (e: React.ChangeEvent<HTMLSelectElement>, postId: string) => {
    const changeSelectValue = e.target.value;
    setSelectValue(changeSelectValue);
    const docRef = doc(db, 'todos', postId)
    await updateDoc(docRef, {
      status: changeSelectValue
    });
    fetchTodos(uid, false, selectSortValue);
  }

  return (
    <>
      <UnorderedList>
        {taskItems.map(todo => (
          <ListItem display='flex' mb={4} key={todo.id}>
            <Text onClick={() => { editingRouting(todo.id) }} _hover={{ cursor: 'pointer' }}>{todo.content}</Text>
            <Spacer />
            <Flex alignItems='center'>
              <SelectBox selectValue={todo.status} onChange={(e) => { selectOnChangeHandler(e, todo.id) }} />
              <Btn onClickHandler={() => { editingRouting(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faFilePen} />
              </Btn>
              <Btn onClickHandler={() => { todoMoveTrashBox(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faTrash} />
              </Btn>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
      <Box textAlign={'right'} py={8}>
        <Btn onClickHandler={moveTrashPage} >
          ゴミ箱一覧
        </Btn>
      </Box>
    </>
  )
}

export default TodoList