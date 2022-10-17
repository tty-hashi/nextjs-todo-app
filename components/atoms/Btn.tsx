import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  buttonText?: string;
  onClickHandler: any;
  children?: any;
  bg?: string;
}

const Btn: React.FC<Props> = ({ buttonText, onClickHandler, children, bg }) => {
  return <Button onClick={onClickHandler} bg={bg}>{buttonText}{children}</Button>
}

export default Btn