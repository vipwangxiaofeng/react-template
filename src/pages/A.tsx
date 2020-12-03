import React, { memo } from 'react'

interface Props {

}

export default memo(function A(props: Props) {
  console.log('a page')
  return (
    <div>
      A Page
    </div>
  )
})
