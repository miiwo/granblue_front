'use client'
import { useState } from "react"

// INTERFACES / SIGNATURES
interface TileProps {
    onClick?: () => void
    children?: React.ReactNode
}

interface NumberSliderProps {
  initialVal: number
  onChange?: () => void
  children?: React.ReactNode
}

// BASE COMPONENTS
export function Tile({onClick, children}: TileProps) {
    return (
      <button onClick={onClick}>{children}</button>
    )
}

export function NumberSlider({initialVal, onChange, children}: NumberSliderProps) {
  const [sliderVal, setSliderVal] = useState(initialVal)

  return (
    <input type='range' min='1' max='100' value={sliderVal} onChange={(event) => { setSliderVal(parseInt(event.target.value)); onChange }} />
  )
}