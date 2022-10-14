import React from 'react'
import { Input } from '@chakra-ui/react'

type Props = {
  placeholder: string;
  marginRight: string;
  value: string;
  onChange: any;
}

const InputTodo = (props: Props) => {
  const { placeholder, marginRight, value, onChange } = props;
  return (
    <>
      <Input placeholder={placeholder} marginRight={marginRight} value={value} onChange={onChange} />
    </>
  )
}

export default InputTodo