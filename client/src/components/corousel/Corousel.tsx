import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import Profile from '../assets/profile.jpeg'
import UseTheme from '../../utils/hooks/UseTheme'

const Corousel = () => {
  const [count, setCount] = useState(0)
  const { theme } = UseTheme()
  const handlePrev = () => {
    if (count >= 0) {
      setCount((prev) => prev - 1)
    }
  }
  const handleNext = () => {
    if (count <= 5) {
      setCount((prev) => prev + 1)
    }
  }
  const circleStyle = 'corousel--current__circles'

  const active = theme.palette.mode == 'light' ? 'active' : 'active-dark'

  return (
    <div className="corousel">
      <div className="corousel--slide">
        {/* <img
          src={
            'https://shop.luminskin.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0044%2F1237%2F5107%2Ffiles%2FMB_2MO_1_1.png%3Fv%3D1597705809&w=1920&q=75'
          }
          className="corousel--image"
        /> */}
        <IconButton
          sx={{ left: '10px', position: 'absolute' }}
          onClick={handlePrev}
          disabled={count == 0}>
          <ArrowBack />
        </IconButton>
        <IconButton
          sx={{ right: '10px', position: 'absolute' }}
          onClick={handleNext}
          disabled={count == 5}>
          <ArrowForward />
        </IconButton>
      </div>
      <div className="corousel--current">
        <span className={`${circleStyle} ${count == 0 ? active : ''}`}></span>
        <span className={`${circleStyle} ${count == 1 ? active : ''}`}></span>
        <span className={`${circleStyle} ${count == 2 ? active : ''}`}></span>
        <span className={`${circleStyle} ${count == 3 ? active : ''}`}></span>
        <span className={`${circleStyle} ${count == 4 ? active : ''}`}></span>
        <span className={`${circleStyle} ${count == 5 ? active : ''}`}></span>
      </div>
    </div>
  )
}

export default Corousel
