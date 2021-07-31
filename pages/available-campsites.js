import React from 'react'
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/common/Camps'),
    { ssr: false }
  )

const DisplayCamps = () => {
    return (
        <div>
            <DynamicComponentWithNoSSR/>
        </div>
    )
}

export default DisplayCamps
