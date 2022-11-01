import React from 'react'

import InputArea from '../molecules/InputArea'
import TodoList from '../molecules/TodoList'
import TodoSort from '../molecules/TodoSort'

const TodoContent = () => {
  return (
    <>
      <InputArea />
      <TodoSort />
      <TodoList />
    </>
  )
}

export default TodoContent
