'use client'

import { useRouter } from "next/navigation"
import { GBFWeaponSearch } from "./gbf-search"
import { Modal, Tile } from "../base/base-components"
import { useContext, useEffect, useState } from "react"
import { GBFWeaponGridContext, Weapon} from "../../calc/gbfcalcContext"
import { fetchWeapons } from "./actions"
import { useWeaponData } from "../custom-hooks"

const formulaMods = {
  'Phoenix Torch': {
    num: 0,
    id: 0,
  },
  'Bahamut Sword': {
      num: 0,
      id: 1,
    },
  'Murcielago': {
    num: 25,
    id: 2,
  },
  'Eresh': {
    num: 100,
    id: 3,
  },
}

const summonList = [
  {name: 'Zeus', id: 0},
  {name: 'Zeph', id: 1},
  {name: 'Bahamut', id: 2},
]

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