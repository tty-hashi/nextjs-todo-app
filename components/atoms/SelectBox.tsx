import { Select } from '@chakra-ui/react'
import { type } from 'os';
import React, { ReactNode, useState } from 'react'

import { selectList } from '../types/types';

type Props = {
  selectValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>, arg1?: string) => void;
  children?: ReactNode;
}

const SelectBox = (props: Props) => {
  const { selectValue, onChange, children } = props;

  return (
    <Select w={'100px'} marginLeft={4} value={selectValue} onChange={onChange} >
      {children}
      {selectList.map(v => <option key={v.id} value={v.id}>{v.value}</option>)}
    </Select>

  )
}

export default SelectBox