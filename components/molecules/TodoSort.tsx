import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

import { sortSelectValue, userIdState } from '../../states/state';
import SelectBox from '../atoms/SelectBox';
import { useFetchTodos } from '../hooks/useFetchTodos';

const TodoSort = () => {
  const uid = useRecoilValue(userIdState)
  const { fetchTodos } = useFetchTodos();
  const [selectSortValue, setSelectSortValue] = useRecoilState(sortSelectValue)


  const selectChengeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value;
    setSelectSortValue(selectValue);
    fetchTodos(uid, false, selectValue);
  }
  return (
    <Box textAlign={'right'} display={'flex'} mb={8} alignItems={'center'} justifyContent={'flex-end'}>
      <Text>todo sort:</Text>
      <SelectBox onChange={selectChengeHandler} selectValue={selectSortValue}>
        <option value='all'>すべて</option>
      </SelectBox>
    </Box>
  )
}

export default TodoSort