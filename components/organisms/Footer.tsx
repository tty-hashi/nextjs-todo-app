import { Box } from '@chakra-ui/react'
import React from 'react'
import { Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <>
      <Box px={8} py={4} bg='red.300' h='75px' display='grid' placeItems='center' >
        <Text fontSize='md' color='red.900' >© Tetsuya Hashi</Text>
      </Box>
    </>
  )
}

export default Footer