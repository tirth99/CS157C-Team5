import React from 'react'
import Login from '../components/UserManagemnet/Login'
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
