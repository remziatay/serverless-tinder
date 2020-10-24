import { Card, Carousel } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  const [imageCache, setImageCache] = useState([])

  useEffect(() => {
    setImageCache(() => [[randomImage(), randomImage(), randomImage()]])
    setCurrent([randomImage(), randomImage(), randomImage(), randomImage(), randomImage()])
  }, [])

  useEffect(() => {
    setImageCache(cache => {
      if (cache.length >= 3) return cache
      const randomProfile = new Array(2 + Math.floor(Math.random() * 5)).fill().map(() => randomImage())
      return [...cache, randomProfile]
    })
  }, [imageCache])

  const slider = useRef(null)

  const newLink = useCallback(() => {
    setImageCache(cache => {
      setCurrent(cache[0])
      return cache.slice(1)
    })
    setLiking({ liked: false, disliked: false })
    slider.current.goTo(0, true)
  }, [])

  const like = useCallback(() => setLiking({ liked: true, disliked: false }), [])
  const dislike = useCallback(() => setLiking({ liked: false, disliked: true }), [])
  const previous = useCallback(() => slider.current.prev(), [])
  const next = useCallback(() => slider.current.next(), [])

  return (
    <>
      <Card hoverable style={{ width: '80vw', userSelect: 'none', margin: '0 auto' }}
        bodyStyle={{ display: 'none' }}
        actions={[
          <LikeTwoTone onClick={like} key='like'/>,
          <DislikeTwoTone onClick={dislike} key='dislike'/>,
          <ArrowDownOutlined onClick={next} key='next'/>,
          <ArrowUpOutlined onClick={previous} key='previous'/>
        ]}
        cover={<Carousel ref={slider} draggable verticalSwiping vertical
          dots={{ className: 'dot' }} dotPosition={'right'}>
          {
            current.map(img =>
              <Picture link={img.src || ''}
                key={img.src}
                newLink={newLink}
                like={like}
                dislike={dislike}
                liked={liking.liked}
                disliked={liking.disliked}
              />
            )
          }
        </Carousel>}
      />
    </>
  )
}

export default App
