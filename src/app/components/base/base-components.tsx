'use client'

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import Link from "next/link"

import classNames from "classnames"
import Image from "next/image"

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
  placeholderText?: string
  query?: any
  searchInputClassName?: string
  searchIconColor?: string
  onClick?: () => void
  setQuery?: (q:any) => void

}

interface NavBarLinkProps {
  link: string
  name: string
}

interface MyImageProps {
  src: any
  width: number
  height: number
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
      <div className="p-8 border md:w-1/2 shadow-lg rounded-md bg-nordwhite 2xl:h-[56vh]">
        <div className="text-center relative">
          <h3 className="text-2xl font-bold text-nordzero">{title ? title : 'Modal Title'}</h3>
          <div className="mt-2 px-7 py-3 text-start">
            {children}
          </div>
          <div className="flex justify-center mt-4">

            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={router.back}
              className="px-3 py-1 bg-nordoceanblue text-white text-base font-medium rounded-md shadow-sm ease-out duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 absolute top-0 right-10 md:right-0"
            >
              X
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export function Search ({searchInputClassName, searchIconColor, placeholderText, query, setQuery}: SearchProps) {

  const searchInputClassNames = classNames(
    "grow ps-8 pe-3 py-5 h-[27px] rounded border focus:outline-none",
    searchInputClassName
  )
  const searchIcon = searchIconColor ? classNames("absolute top-3.5 left-2", searchIconColor) : 'absolute top-3.5 left-2 text-nordwhite'
  // TODO: Need to define the type of query in the SearchProps for clarity
  const [personalSearch, setPersonalSearch] = useState<string>('')

  const debounceSearch = (e:any) => {
    setPersonalSearch(e.target.value)
  }

  useEffect(() => {
    // If the query is still being crafted, don't set it just yet
    const debounceTimer = setTimeout(() => {
      if (query && setQuery) {
        let _query = {...query, query: personalSearch || ""}
        setQuery(_query)
      }
    }, 1000)

    return () => clearTimeout(debounceTimer)
  }, [personalSearch])

  return (
    <div className="flex relative rounded">
        <FontAwesomeIcon icon={faMagnifyingGlass} className={searchIcon} />
        <input type='search' value={personalSearch} onChange={debounceSearch} placeholder={placeholderText} className={searchInputClassNames} autoFocus />
    </div>
  )
}
// rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none ring-2 ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-gray-700
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

export function LoadingSpinner() {
  return (
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto" role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}

export function NavBarLink({link, name}: NavBarLinkProps) {
  const pathname = usePathname()
  const isActive = (href:string) => pathname === href

  if (isActive(link)) {
    return (
      <Link key={link} href={link}
        className="transition-all hover:text-neutral-200 dark:hover:text-nordblue text-nordblue flex align-middle relative py-1 px-2 m-1"
        >
        {name}
      </Link>
    )
  } else {
    return (
      <Link href={link}
        className="transition-all hover:text-neutral-200 dark:hover:text-nordblue flex align-middle relative py-1 px-2 m-1"
        >
        {name}
      </Link>
    )
  }
}

export function InlineImage({src, width, height}: MyImageProps) {
  const inlineClass = classNames(
    "relative inline-flex",
    `w-[${width}px]`, `h-[${height}px]`
  )

  return (
    <span className={inlineClass}><Image src={src} alt="some image" fill /></span>
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