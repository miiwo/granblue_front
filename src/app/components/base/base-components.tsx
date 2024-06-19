'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React from "react"

// INTERFACES / SIGNATURES
interface TileProps {
    onClick?: () => void,
    customStyle?: string,
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
  query?: string
  placeholderText?: string
  onClick?: () => void
  setQuery?: (q:string) => void
}


// BASE COMPONENTS
export function Tile({onClick, customStyle, children}: TileProps) {
    return (
      <button className={customStyle}  onClick={onClick}>{children}</button>
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
      <div className="p-8 border w-1/2 shadow-lg rounded-md bg-nordwhite h-2/4">
        <div className="text-center relative">
          <h3 className="text-2xl font-bold text-nordzero">{title ? title : 'Modal Title'}</h3>
          <div className="mt-2 px-7 py-3 text-start">
            {children}
          </div>
          <div className="flex justify-center mt-4">

            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={router.back}
              className="px-3 py-1 bg-nordoceanblue text-white text-base font-medium rounded-md shadow-sm ease-out duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 absolute top-0 right-0"
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

export function Search ({onClick, placeholderText, query, setQuery}: SearchProps) {

  return (
    <div className="flex bg-nordoceanblue rounded">
        <input type='search' value={query} placeholder={placeholderText} className="grow pl-1 rounded text-black" onChange={(e) => {setQuery ? setQuery(e.target.value) : () => {}}} />
        <button className="px-3 text-white" onClick={onClick}><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</button>
    </div>
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

export function ToggleButton () {
  return (
    <input type="checkbox"
            className="relative
                      appearance-none
                      inline-block
                      h-[30px]
                      w-[54px]
                      cursor-pointer
                      rounded-full
                      bg-slate-300
                      shadow-md
                      transition-all
                      after:content-['']
                      after:absolute
                      after:top-[3px]
                      after:h-6
                      after:w-6
                      after-rounded-full
                      after:bg-white
                      after:shadow-sm
                      after:transition-all
                      checked:bg-blue-400
                      checked:after:translate-x-6"></input>
  )
}

/*export function AnimatedRadioGroup({radioName, selectedColor, elementList, classNameList}: {radioName: string, selectedColor: string, elementList: string[], classNameList: string[]}) {
  const elementWidth = 100 / elementList.length
  const animationClassNames = elementList.map((item, i) => {
      return 'peer-checked/' + item + ':translate-x-[' + (i * 100) + '%]'
  }).join(' ')

  if (elementList.length != classNameList.length) {
    throw new Error('Mismatching lengths in element and class list')
  }

  return (
    <fieldset className="flex relative gap-3 rounded-lg bg-slate-700 w-full">
      {elementList.map( (item, i) => {
        return (
          <React.Fragment key={`input_${radioName}_${item}`}>
            <input id={`${radioName}${item}`} type="radio" name={radioName} value={item} defaultChecked={i === 0} className={`peer/${item}`} />
            <label htmlFor={`${radioName}${item}`} className={`w-1/6 z-10 cursor-pointer ml-1 px-3 rounded-lg select-none truncate uppercase`}>{item}</label>
          </React.Fragment>
        )
      })}
      <div className={`flex w-1/6 px-3 rounded-lg bg-${selectedColor} z-[9] h-full p-0 select-none truncate absolute transform transition-transform ${animationClassNames}`}></div>
    </fieldset>
  )
}*/