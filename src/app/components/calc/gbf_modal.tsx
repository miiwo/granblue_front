'use client'

import { useRouter } from "next/navigation"
import { Modal, Search, Tile } from "../base/base-components"
import { useContext, useEffect, useState } from "react"
import { GBFWeaponGridContext } from "../../calc/gbfcalcContext"
import { useSummonData, useWeaponListData } from "../custom-hooks"



export function GBFWepGridModal() {  
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()
  const [weaponList, query, setQuery] = useWeaponListData()

  return (
      <Modal title="GBF Weapons">
          <Search placeholderText="Search weapons..." query={query} setQuery={setQuery} />
          <div className="flex flex-col w-[90vw] lg:w-[45vw] 2xl:h-[40vh] overflow-y-auto mt-5 text-black pl-4 md:pl-0">
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