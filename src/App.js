import { Card, Carousel } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import Picture from './Components/Picture'
import { LikeTwoTone, DislikeTwoTone, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

const randomImage = () => {
  const link = `https://via.placeholder.com/${300 + Math.round(Math.random() * 1000)}x${300 + Math.round(Math.random() * 1000)}.png`
  const image = new Image()
  image.src = link
  return image
}

function App () {
  const [current, setCurrent] = useState([])
  const [liking, setLiking] = useState({ liked: false, disliked: false })
  const [sliding, setSliding] = useState({ previous: false, next: false })
  const [imageCache, setImageCache] = useState([])
  const [imageIndex, setImageIndex] = useState(NaN)

  useEffect(() => {
    setImageCache(() => [[randomImage(), randomImage(), randomImage()]])
    setCurrent([randomImage(), randomImage(), randomImage(), randomImage(), randomImage()])
    setImageIndex(0)
  }, [])

  useEffect(() => {
    setImageCache(cache => {
      if (cache.length >= 3) return cache
      const randomProfile = new Array(2 + Math.floor(Math.random() * 5)).fill().map(() => randomImage())
      return [...cache, randomProfile]
    })
  }, [imageCache])

  const newLink = useCallback(() => {
    setImageCache(cache => {
      setCurrent(cache[0])
      setImageIndex(0)
      return cache.slice(1)
    })
    setLiking({ liked: false, disliked: false })
  }, [])

  const like = useCallback(() => setLiking({ liked: true, disliked: false }), [])
  const dislike = useCallback(() => setLiking({ liked: false, disliked: true }), [])

  const previous = useCallback(() => setSliding({ previous: true, next: false }), [])
  const next = useCallback(() => setSliding({ previous: false, next: true }), [])

  const slide = useCallback(() => {
    if (sliding.previous) setImageIndex(index => (current.length + index - 1) % current.length)
    else if (sliding.next) setImageIndex(index => (current.length + index + 1) % current.length)
    setSliding({ previous: false, next: false })
  }, [current.length, sliding])

  return (
    <>
      <Card hoverable style={{ width: '80vw', userSelect: 'none', margin: '0 auto' }}
        bodyStyle={{ display: 'none' }}
        actions={[
          <LikeTwoTone onClick={like} key='like'/>,
          <DislikeTwoTone onClick={dislike} key='dislike'/>,
          <ArrowUpOutlined onClick={next} key='next'/>,
          <ArrowDownOutlined onClick={previous} key='previous'/>
        ]}
        cover={<Carousel vertical
          dots={{ className: 'dot' }} dotPosition={'right'}>
          {
            current.map(img =>
              <Picture link={img.src || ''}
                key={img.src}
                newLink={newLink}
                slidePrevious={previous}
                slideNext={next}
                like={like}
                dislike={dislike}
                liked={liking.liked}
                disliked={liking.disliked}
                previous={sliding.previous}
                next={sliding.next}
                slide={slide}
              />
            )
          }
        </Carousel>}
      />
    </>
  )
}

export default App
