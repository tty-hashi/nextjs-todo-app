import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { RecoilRoot } from 'recoil'
import TodoContent from '../components/organisms/TodoContent'
import { Container } from '@chakra-ui/react'
import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'

export default function Home() {
  return (
    <>
      <TodoContent />
    </>
  )
}
