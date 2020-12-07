import React, { memo } from 'react'

type Props = {
  name?: string
}
export default memo(function Home({}: Props) {
  return <div>Home Page</div>
})
