import React from 'react'
import { useRouter } from 'next/router';

import Btn from './Btn';

type Props = {
  mr?: number | string;
}

const GohomeBtn = (props: Props) => {
  const { mr } = props;
  const router = useRouter();

  const goHome = () => {
    router.push({
      pathname: "/",
    });
  }
  return (
    <>
      <Btn onClickHandler={goHome} mr={mr}>ホーム</Btn>
    </>
  )
}

export default GohomeBtn