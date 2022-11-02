import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Btn from '../components/atoms/Btn';
import TodoContent from '../components/organisms/TodoContent'
import { auth, singInWithGoogle } from '../firebase/firebase-settings';

export default function Home() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    const logInBtnHandler = () => {
      singInWithGoogle()
    }
  }, [])
  return (
    <>
      {!user ?
        <Box display='flex' justifyContent='center' alignItems='center' pt={20}>
          <Btn buttonText={'ログイン'} onClickHandler={singInWithGoogle} />
        </Box> :
        <TodoContent />
      }
    </>
  )
}
