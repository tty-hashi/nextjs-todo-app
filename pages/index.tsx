import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { RecoilRoot } from 'recoil'
import TodoContent from '../components/templates/TodoContent'
import { Container } from '@chakra-ui/react'
import Header from '../components/templates/Header'
import Footer from '../components/templates/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Container maxW='700px' mx='auto'>
        <TodoContent />
      </Container>
      <Footer />
    </>
  )
}
