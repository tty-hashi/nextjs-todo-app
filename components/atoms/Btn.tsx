import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  buttonText: string;
  onClickHandler: () => void
}

const Btn: React.FC<Props> = ({ buttonText, onClickHandler }) => {
  return <Button onClick={onClickHandler}>{buttonText}</Button>
}

export default Btn