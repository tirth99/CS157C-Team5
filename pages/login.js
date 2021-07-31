import React from 'react'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/UserManagemnet/Login'),
    { ssr: false }
  )

const login = () => {
    return (
        <DynamicComponentWithNoSSR/>
    )
}

export default login
