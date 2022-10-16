import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { taskItemState, userIdState } from '../../states/state';
import { useFetchTodos } from '../hooks/useFetchTodos';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { Box, Flex, ListItem, Select, Spacer, UnorderedList } from '@chakra-ui/react';

const TodoList = () => {
  const { fetchTodos } = useFetchTodos();
  const taskItems = useRecoilValue(taskItemState)
  const uid = useRecoilValue(userIdState)
  //firebaseからtaskを取得して、stateを更新

  useEffect(() => {
    fetchTodos(uid);
  }, [])
  console.log(taskItems);

  return (
    <>
      <UnorderedList>
        {taskItems.map(todo => (
          <ListItem display='flex' mb={4}>
            <p>{todo.content}</p>
            <Spacer />
            <Flex alignItems='center'>
              <Select w={'100px'} marginRight={4}>
                <option value="nostarted">nostarted</option>
                <option value="inprogress">inprogress</option>
                <option value="done">done</option>
              </Select>
              <FontAwesomeIcon icon={faFilePen} style={{ marginRight: '10px' }} />
              <FontAwesomeIcon icon={faTrash} />
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  )
}

export default TodoList