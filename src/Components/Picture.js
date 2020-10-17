import React from 'react'

function Picture (props) {
  const width = props.width || 300
  const height = props.height || width
  return (
    <img alt='' src={`https://via.placeholder.com/${width}x${height}.png`}/>
  )
}

export default Picture
