import { Box, Container } from '@chakra-ui/react'
import React, { ReactHTMLElement, ReactNode } from 'react'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Box bg='red.50'>
        <Container maxW='700px' mx='auto'>
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Layout