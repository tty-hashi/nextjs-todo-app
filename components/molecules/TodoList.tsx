import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchTodos } from '../hooks/useFetchTodos';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { Box, Flex, ListItem, Select, Spacer, UnorderedList } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';

import { taskItemState, userIdState } from '../../states/state';
import { db } from '../../firebase/firebase-settings';
import Btn from '../atoms/Btn';
import { useRouter } from 'next/router';
import SelectBox from '../atoms/SelectBox';

const TodoList = () => {
  const { fetchTodos } = useFetchTodos();
  const [taskItems, setTaskItems] = useRecoilState(taskItemState)
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
    console.log(uid);
    fetchTodos(uid);
  }, [uid])

  //編集ボタンをクリックしたら、editigページへpostidをクエリパラメータとして遷移する。
  const router = useRouter();
  const clickButton = (postId: string) => {
    router.push({
      pathname: "/editing",   //遷移先
      query: { postId: postId } //クエリパラメータ
    });
  }
  const moveTrashPage = () => {
    router.push({
      pathname: "/trash",   //遷移先
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
      <UnorderedList>
        {taskItems.map(todo => (
          <ListItem display='flex' mb={4} key={todo.id}>
            <p>{todo.content}</p>
            <Spacer />
            <Flex alignItems='center'>
              <SelectBox selectValue={todo.status} onChange={(e) => { selectOnChangeHandler(e, todo.id) }} />
              <Btn onClickHandler={() => { clickButton(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faFilePen} />
              </Btn>
              <Btn onClickHandler={() => { todoMoveTrashBox(todo.id) }} bg={'transparent'}>
                <FontAwesomeIcon icon={faTrash} />
              </Btn>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
      <Box textAlign={'right'} my={8}>
        <Btn onClickHandler={moveTrashPage} >
          ゴミ箱一覧
        </Btn>
      </Box>
    </>
  )
}

export default TodoList