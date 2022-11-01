import React, { ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'

import Footer from '../organisms/Footer'
import Header from '../organisms/Header'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Box bg='red.50' minHeight='calc(100vh - 140px)'>
        <Container maxW='700px' mx='auto'>
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Layout