import styled from '@emotion/styled'
import React from 'react'
import InputArea from '../molecules/InputArea'

const TodoContent = () => {
  return (
    <SmainContent>
      <InputArea />
    </SmainContent>
  )
}

export default TodoContent

const SmainContent = styled.div`
  min-height: calc(100vh - 140px);
`