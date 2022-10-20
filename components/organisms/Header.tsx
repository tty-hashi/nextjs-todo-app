import React from 'react'
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router';

import LoginLogoutBtn from '../molecules/LoginLogoutBtn'

const Header: React.FC = () => {
  const router = useRouter();

  const logoOnClickHandler = () => {
    router.push({
      pathname: "/",
    });
  }
  return (
    <>
      <Box px={8} py={4} bg='red.300'>
        <Flex alignItems='center'>
          <Heading as='h1' size='xl' color='red.900' onClick={logoOnClickHandler} >Next.js TodoApp 初級</Heading>
          <Spacer />
          <LoginLogoutBtn />
        </Flex>
      </Box>
    </>
  )
}

export default Header