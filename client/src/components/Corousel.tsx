import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import Slider from '../assets/image1.jpg'
import Profile from '../assets/profile.jpeg'
import UseTheme from '../utils/hooks/UseTheme'

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
        <img src={Slider} className="corousel--image" />
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
