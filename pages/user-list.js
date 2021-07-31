import React from 'react'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/Admin/UserList'),
    { ssr: false }
  )

const userList = () => {
    return (
        <DynamicComponentWithNoSSR/>
    )
}

export default userList
