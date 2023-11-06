'use client'
import React from 'react'
import style from '@/styles/Hero.module.css'
import { useSelectedLayoutSegment } from 'next/navigation'

const Hero = () => {
  const segment = useSelectedLayoutSegment()

  if (segment) return

  return (
    <div className={style.heroContainer}>
      <div className={style.heroContent}>
        <p className={style.heroText}>
          <span>
            Welcome to my blog! here you can find a lot of my travel stories,
            inspiration and my thoughts of life. Please enjoy!
          </span>
        </p>
      </div>
      <div className={style.heroBackdrop}></div>
      <div className={style.heroVideoContainer}>
        <video autoPlay loop muted className={style.heroVideo}>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default Hero
