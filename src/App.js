import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import Picture from './Components/Picture'

const randomImage = () => {
  const link = `https://via.placeholder.com/${300 + Math.round(Math.random() * 1000)}x${300 + Math.round(Math.random() * 1000)}.png`
  const image = new Image()
  image.src = link
  return image
}

function App () {
  const [link, setLink] = useState(randomImage().src)
  const [liking, setLiking] = useState({ liked: false, disliked: false })
  const [imageCache, setImageCache] = useState([])

  useEffect(() => {
    setImageCache(() => [randomImage()])
  }, [])

  useEffect(() => {
    setImageCache(cache => {
      if (cache.length >= 10) return cache
      return [...cache, randomImage()]
    })
  }, [imageCache])

  const newLink = useCallback(() => {
    setImageCache(cache => {
      setLink(cache[0].src)
      return cache.slice(1)
    })
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
