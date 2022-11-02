import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil';

import { auth, singInWithGoogle } from '../../firebase/firebase-settings'
import { userIdState } from '../../states/state';
import Btn from '../atoms/Btn';


const LoginLogoutBtn: React.FC = () => {
  const setUserId = useSetRecoilState(userIdState)
  // userの変更をfirebasehooksで検知してstateを書き換え
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
    }
  });

  //firebasehooksでuserのログイン・ログアウト状態を管理
  const [user] = useAuthState(auth);
  //googleサインアウト
  const singOutWithGoogle = () => {
    auth.signOut();
    location.reload();
  }

  return (
    <>
      {!user ? <Btn buttonText={'ログイン'} onClickHandler={singInWithGoogle} /> :
        <Btn buttonText={'ログアウト'} onClickHandler={singOutWithGoogle} />}
    </>
  )
}

export default LoginLogoutBtn