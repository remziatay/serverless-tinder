import React from 'react'
import './App.css'
import Picture from './Components/Picture'

function App () {
  return (
    <div className="App">
      <p>INIT</p>
      <Picture width={300 + Math.round(Math.random() * 1000)} height={300 + Math.round(Math.random() * 500)}/>
    </div>
  )
}

export default App
