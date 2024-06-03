'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

// INTERFACES / SIGNATURES
interface TileProps {
    onClick?: () => void
    children?: React.ReactNode
}

export interface NumberSliderProps {
  initialVal: number
  onMouseUp?: () => void
  children?: React.ReactNode
}

interface ModalMeta {
  title?: string
  children: React.ReactNode
}

export interface SearchProps {
  placeholderText?: string
  onClick?: () => void
}


// BASE COMPONENTS
export function Tile({onClick, children}: TileProps) {
    return (
      <button onClick={onClick}>{children}</button>
    )
}

export function NumberSlider({initialVal, onMouseUp = () => {}, children}: NumberSliderProps) {
  const [sliderVal, setSliderVal] = useState(initialVal)

  return (
    <input type='range' min='1' max='100' value={sliderVal} onChange={(event) => { setSliderVal(parseInt(event.target.value)) }} onMouseUp={onMouseUp} />
  )
}

export function Modal({title, children}: ModalMeta) {
  const router = useRouter()

  // <p className="text-lg text-gray-500">Modal Body</p>

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-1/2 shadow-lg rounded-md bg-white">
        <div className="text-center relative">
          <h3 className="text-2xl font-bold text-gray-900">{title ? title : 'Modal Title'}</h3>
          <div className="mt-2 px-7 py-3 text-start">
            {children}
          </div>
          <div className="flex justify-center mt-4">

            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={router.back}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 absolute top-0 right-0"
            >
              X
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export function DefaultSearchModal() {
  return (
      <Modal>
          <DefaultSearch />
      </Modal>
  )
}

export function Search ({onClick, placeholderText}: SearchProps) {
  return (
      <>
          <label className="text-black italic">Search the site</label>
          <div className="flex gap-4 text-black">
              <input type='search' placeholder={placeholderText} className="grow"/>
              <button onClick={onClick}>Search</button>
          </div>
      </>
  )
}

export function DefaultSearch({onClick, placeholderText}: SearchProps) {
  return (
      <>
          <label className="text-black italic">Search the site</label>
          <div className="flex text-black">
              <input type='search' placeholder={placeholderText} />
              <button onClick={onClick} >Search</button>
          </div>
      </>
  )
}