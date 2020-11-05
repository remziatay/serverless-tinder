import React from 'react'

const TitleWithButton = ({ title, button }) => {
  return (
    <div className='flex justify-between items-end border-b pb-1 mb-1'>
      <h2 className='text-2xl font-semibold tracking-wide m-0'>{title}</h2>
      {button}
    </div>
  )
}

export default TitleWithButton
