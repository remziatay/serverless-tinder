import React, { useCallback, useState } from 'react'
import './App.css'
import Picture from './Components/Picture'

const randomImage = () => `https://via.placeholder.com/${300 + Math.round(Math.random() * 1000)}x${300 + Math.round(Math.random() * 500)}.png`

function App () {
  const [link, setLink] = useState(randomImage())

  const newLink = useCallback(() => setLink(randomImage), [])

  return (
    <div className="App">
      <p>INIT</p>
      <Picture link={link} newLink={newLink}/>
    </div>
  )
}

export default App
