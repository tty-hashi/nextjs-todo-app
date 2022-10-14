import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Container, Spacer } from '@chakra-ui/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import InputTodo from '../atoms/Input'
import Btn from '../atoms/Btn'
import { todoInputState, userIdState } from '../../states/state';
import { db } from '../../firebase/firebase-settings';

const InputArea: React.FC = () => {
  const [todoInput, setTodoInput] = useRecoilState(todoInputState);
  const userId = useRecoilValue(userIdState)
  // inputの変更をstateへset
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  }
  const addTodo = async () => {
    await addDoc(collection(db, 'todos'), {
      content: todoInput,
      createdAt: serverTimestamp(),
      isComplete: false,
      uid: userId,
      status: 'nostarted'
    })
    setTodoInput('');

  }
  const onclickHandler = () => {
    addTodo();
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Container maxW='768px' display='flex'>
        <InputTodo placeholder='Todoを入力してください。' marginRight='16px' value={todoInput} onChange={onChangeText} />
        <Spacer />
        <Btn buttonText='送信' onClickHandler={onclickHandler} />
      </Container>
    </form>
  )
}

export default InputArea