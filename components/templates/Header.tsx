import React, { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react'

import Btn from '../atoms/Btn'
import { auth, sinInWithGoogle } from '../../firebase/firebase-settings'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userIdState } from '../../states/state';

const Header: React.FC = () => {
  const setUserIdState = useSetRecoilState(userIdState)
  const uid = useRecoilState(userIdState)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIdState(user.uid);
      }
    });
  }, [onAuthStateChanged])
  console.log(uid);

  return (
    <>
      <Box px={8} py={4} bg='red.300'>
        <Flex alignItems='center'>
          <Heading as='h1' size='xl' color='red.900' >Next.js TodoApp 初級</Heading>
          <Spacer />
          { }
          <Btn buttonText={'ログイン'} onClickHandler={sinInWithGoogle} />
        </Flex>
      </Box>
    </>
  )
}

export default Header