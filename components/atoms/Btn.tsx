import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  buttonText?: string;
  onClickHandler: any;
  children?: any;
  bg?: string;
  mr?: number | string;
  disabled?: boolean | null | undefined;
}

const Btn: React.FC<Props> = ({ buttonText, onClickHandler, children, bg, mr, disabled }) => {
  return <Button onClick={onClickHandler} bg={bg} mr={mr} disabled={disabled}>{buttonText}{children}</Button>
}

export default Btn