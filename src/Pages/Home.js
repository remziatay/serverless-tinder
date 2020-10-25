import { ArrowDownOutlined, ArrowUpOutlined, DislikeTwoTone, LikeTwoTone } from '@ant-design/icons'
import { useKeyPress } from 'ahooks'
import { Card, Carousel } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Picture from '../Components/Picture'

const randomImage = () => {
  const link = `https://via.placeholder.com/${300 + Math.round(Math.random() * 1000)}x${300 + Math.round(Math.random() * 1000)}.png`
  const image = new Image()
  image.src = link
  return image
}

const Home = (props) => {
  const [current, setCurrent] = useState([])
  const [liking, setLiking] = useState({ liked: false, disliked: false })
  const [imageCache, setImageCache] = useState([])
  const [imgIndex, setImgIndex] = useState(0)

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
    slider.current.innerSlider.slideHandler(0, true)
    setImageCache(cache => {
      setCurrent(cache[0])
      slider.current.goTo(0, true)
      return cache.slice(1)
    })
    setLiking({ liked: false, disliked: false })
    setImgIndex(0)
  }, [])

  const like = useCallback(() => setLiking({ liked: true, disliked: false }), [])
  const dislike = useCallback(() => setLiking({ liked: false, disliked: true }), [])
  const previous = useCallback(() => slider.current.prev(), [])
  const next = useCallback(() => slider.current.next(), [])

  useKeyPress('ArrowUp', previous)
  useKeyPress('ArrowDown', next)
  useKeyPress('ArrowLeft', dislike)
  useKeyPress('ArrowRight', like)

  return (
    <>
      <Card hoverable className='Card'
        bodyStyle={{ display: 'none' }}
        actions={[
          <ArrowUpOutlined onClick={previous} key='previous'/>,
          <ArrowDownOutlined onClick={next} key='next'/>,
          <DislikeTwoTone twoToneColor={'red'} onClick={dislike} key='dislike'/>,
          <LikeTwoTone onClick={like} key='like'/>
        ]}
        cover={<Carousel touchThreshold={12} ref={slider} draggable verticalSwiping vertical
          dots={{ className: 'dot' }} dotPosition={'right'} afterChange={useCallback(c => setImgIndex(c), [])}>
          {
            current.map((img, i) =>
              i === imgIndex
                ? <Picture link={img.src || ''}
                  key={img.src}
                  newLink={newLink}
                  like={like}
                  dislike={dislike}
                  liked={liking.liked}
                  disliked={liking.disliked}
                /> : <Picture link={img.src || ''}
                  key={img.src}
                  like={like}
                  dislike={dislike}
                />
            )
          }
        </Carousel>}
      />
    </>
  )
}

export default Home
