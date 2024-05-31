'use client'

import { useRouter } from "next/navigation"
import { DefaultSearch, GBFWeaponSearch } from "./gbf-search"


interface ModalMeta {
    title?: string
    children: any
}

const formulaMods = {
  'Total': {
    num: 0,
    mulx: '=',
    id: 0
  },
  'Magna': {
      num: 0,
      mulx: 'x',
      id: 1
    },
  'Normal': {
    num: 25,
    mulx: 'x',
    id: 2
  },
  'EX': {
    num: 100,
    mulx: '',
    id: 3
  },
}

function Modal({title, children}: ModalMeta) {
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

export function GBFWepModal() {  
  return (
      <Modal title="GBF Weapons">
          <GBFWeaponSearch />
          <div className="grid text-black">
          {Object.entries(formulaMods).map(([modName, { num, mulx, id }]) => {
            return (
                <div key={id}>
                    {modName}
                </div>
            )
          })}
          </div>
      </Modal>
  )
}