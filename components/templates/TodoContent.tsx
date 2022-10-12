import styled from '@emotion/styled'
import React from 'react'
import InputArea from '../molecules/InputArea'

const TodoContent = () => {
  return (
    <Sdiv>
      <InputArea />
    </Sdiv>
  )
}

export default TodoContent

const Sdiv = styled.div`
  min-height: calc(100vh - 140px);
`