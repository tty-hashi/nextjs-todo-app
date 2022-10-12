import { useSetRecoilState } from 'recoil';
import { onAuthStateChanged } from "firebase/auth";

import { userIdState } from '../../states/state';
import { auth } from '../../firebase/firebase-settings';


export const useSetUid = () => {
  const setUserIdState = useSetRecoilState(userIdState)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserIdState(user.uid);
    }
  });
}