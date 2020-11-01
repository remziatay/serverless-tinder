import React from 'react'

const ErrorDiv = ({ children }) => {
  return (
    <div className='text-red-500 text-xs italic'>
      {children}
    </div>
  )
}

export default ErrorDiv
