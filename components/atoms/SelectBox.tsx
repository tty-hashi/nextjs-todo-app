import { Select } from '@chakra-ui/react'
import { type } from 'os';
import React, { useState } from 'react'

import { selectList } from '../types/types';

type Props = {
  selectValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = (props: Props) => {
  const { selectValue, onChange } = props;

  return (
    <Select w={'100px'} marginLeft={4} value={selectValue} onChange={onChange} >
      <option value='all'>すべて</option>
      {selectList.map(v => <option key={v.id} value={v.id}>{v.value}</option>)}
    </Select>

  )
}

export default SelectBox