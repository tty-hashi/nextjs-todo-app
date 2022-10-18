import React from 'react'
import { useRouter } from "next/router";

const Editing = () => {
  const router = useRouter();
  console.log(router.query.postId);

  return (
    <>
      <div>ルーター：{router.query.postId}</div>
    </>
  )
}

export default Editing