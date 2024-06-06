'use client'

import { useRouter } from "next/navigation"
import { Modal, Search, Tile } from "../base/base-components"
import { useContext } from "react"
import { GBFWeaponGridContext } from "../../calc/gbfcalcContext"
import { useSummonData, useWeaponData } from "../custom-hooks"



export function GBFWepGridModal() {  
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()
  const [weaponList, refetchData] = useWeaponData()

  const onClick = () => {
    refetchData('blah')
  }

  return (
      <Modal title="GBF Weapons">
          <Search onClick={onClick} />
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