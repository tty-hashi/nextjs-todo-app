import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import Layout from '../components/templates/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
