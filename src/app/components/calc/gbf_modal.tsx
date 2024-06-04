'use client'

import { useRouter } from "next/navigation"
import { GBFWeaponSearch } from "./gbf-search"
import { Modal, Tile } from "../base/base-components"
import { useContext } from "react"
import { GBFWeaponGridContext } from "../../calc/gbfcalcContext"
import { useSummonData, useWeaponData } from "../custom-hooks"



export function GBFWepGridModal() {  
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()
  const weaponList = useWeaponData()

  return (
      <Modal title="GBF Weapons">
          <GBFWeaponSearch />
          <div className="flex flex-col w-1/2 mt-5 text-black">
          {weaponList.map( item => {
            return (
                <Tile key={item.name} customStyle="text-left" onClick={() => {gbfContext.setWeaponToTile(item); router.back()}}>
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
      <GBFWeaponSearch />
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