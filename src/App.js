import React, { useCallback, useState } from 'react'
import './App.css'
import Picture from './Components/Picture'

const randomImage = () => `https://via.placeholder.com/${300 + Math.round(Math.random() * 1000)}x${300 + Math.round(Math.random() * 500)}.png`

function App () {
  const [link, setLink] = useState(randomImage())
  const [liking, setLiking] = useState({ liked: false, disliked: false })

  const newLink = useCallback(() => {
    setLink(randomImage())
    setLiking({ liked: false, disliked: false })
  }, [])
  const like = useCallback(() => setLiking({ liked: true, disliked: false }), [])
  const dislike = useCallback(() => setLiking({ liked: false, disliked: true }), [])

  return (
    <div className="App">
      <Picture link={link} newLink={newLink} liked={liking.liked} disliked={liking.disliked}/>
      <div style={{ textAlign: 'center', padding: '1em' }}>
        <button onClick={dislike} style={{ width: '5em' }}>NO</button>
        <button onClick={like} style={{ width: '5em' }}>YES</button>
      </div>
    </div>
  )
}

export default App
