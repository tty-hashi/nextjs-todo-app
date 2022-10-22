import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Container, Select, Spacer } from '@chakra-ui/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import InputTodo from '../atoms/Input'
import Btn from '../atoms/Btn'
import { todoInputState, userIdState } from '../../states/state';
import { db } from '../../firebase/firebase-settings';
import { useFetchTodos } from '../hooks/useFetchTodos';
import SelectBox from '../atoms/SelectBox';

const InputArea: React.FC = () => {
  const [todoInput, setTodoInput] = useRecoilState(todoInputState);
  const uid = useRecoilValue(userIdState)
  const { fetchTodos } = useFetchTodos();
  const [selectSortValue, setSelectSortValue] = useState('');

  // inputの変更をstateへset
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  }
  const addTodo = async () => {
    if (todoInput === '') return;
    await addDoc(collection(db, 'todos'), {
      content: todoInput,
      createdAt: serverTimestamp(),
      isComplete: false,
      uid,
      status: 'nostarted'
    })
    setTodoInput('');
    fetchTodos(uid, false);
  }
  const onclickHandler = () => {
    addTodo();
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  }

  const selectChengeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value;
    setSelectSortValue(selectValue);
    fetchTodos(uid, false, selectValue);
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Container maxW='768px' display='flex' py={10}>
        <InputTodo placeholder='Todoを入力してください。' marginRight='16px' value={todoInput} onChange={onChangeText} />
        <Spacer />
        <SelectBox onChange={selectChengeHandler} selectValue={selectSortValue} />
        <Btn buttonText='送信' onClickHandler={onclickHandler} />
      </Container>
    </form>
  )
}

export default InputArea