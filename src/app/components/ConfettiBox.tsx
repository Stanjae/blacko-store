'use client'
import React from 'react'
import Confetti from 'react-confetti'

export const ConfettiBox =() => {
  return (
    <Confetti confettiSource={{x:500, y:0, w:700,h:0}}
      width={1400}
      height={500}
    />
  )
}