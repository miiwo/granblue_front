'use client'

import { useRouter } from "next/navigation"
import { Modal, Search, Tile } from "../base/base-components"
import { useContext, useEffect, useState } from "react"
import { GBFWeaponGridContext } from "../../calc/gbfcalcContext"
import { useSummonData, useWeaponData } from "../custom-hooks"



export function GBFWepGridModal() {  
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()
  const [weaponList, refetchData] = useWeaponData()
  const [query, setQuery] = useState('') // Consider putting this into a context?

  const onClick = () => {
    refetchData(query)
  }

  useEffect(() => {
    let timer = setTimeout(() => {
        if (query) {
            refetchData(query)
        }
    }, 1000)

    return () => clearTimeout(timer)
  }, [query])

  return (
      <Modal title="GBF Weapons">
          <Search onClick={onClick} placeholderText="Search weapons..." query={query} setQuery={setQuery} />
          <div className="flex flex-col w-full mt-5 text-black">
          {weaponList.map( item => {
            return (
                <Tile key={item.name} customStyle="text-left ease-out duration-300 hover:bg-nordblue" onClick={() => {gbfContext.setWeaponToTile(item); router.back()}}>
                  {item.name}
                </Tile>
            )
          })}
          </div>
      </Modal>
  )
}

export function GBFSumGridModal() {
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()
  const summonList = useSummonData()

  return (
    <Modal title="GBF Summons">
      <Search />
      <div className="grid text-black">
        {summonList.map( item => {
          return (
            <Tile key={item.id} onClick={() => {gbfContext.setSummonToTile(item); router.back()}}>
              {item.name}
            </Tile>
          )
        })}
      </div>
    </Modal>
  )
}