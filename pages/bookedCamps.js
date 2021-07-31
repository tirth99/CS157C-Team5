import React from 'react'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/common/BookedCamps'),
    { ssr: false }
  )

const bookedCamps = () => {
    return (
        <DynamicComponentWithNoSSR/>
    )
}

export default bookedCamps
