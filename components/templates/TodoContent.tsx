import styled from '@emotion/styled'
import React from 'react'
import InputArea from '../molecules/InputArea'
import TodoList from '../molecules/TodoList'

const TodoContent = () => {
  return (
    <SmainContentContainer>
      <InputArea />
      <TodoList />
    </SmainContentContainer>
  )
}

export default TodoContent

const SmainContentContainer = styled.div`
  min-height: calc(100vh - 140px);
`