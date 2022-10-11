import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Box bg='red.50'>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
