'use client'

import { useRouter } from "next/navigation"
import { LoadingSpinner, Modal, Search, Tile } from "../base/base-components"
import { useContext } from "react"
import { GBFWeaponGridContext } from "../../calc/gbfcalcContext"
import { useSummonData, useWeaponListData } from "../custom-hooks"



export function GBFWepGridModal() {  
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()
  const [weaponList, isLoading, query, setQuery] = useWeaponListData()

  return (
      <Modal title="GBF Weapons">
          <Search placeholderText="Search weapons..." query={query} setQuery={setQuery} searchInputClassName="text-black" />
          <div className="flex flex-col w-[90vw] lg:w-full h-[10vh] 2xl:h-[40vh] overflow-y-auto mt-5 text-black pl-4 md:pl-0">
            {isLoading && <LoadingSpinner />}
          {!isLoading && weaponList.map( item => {
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