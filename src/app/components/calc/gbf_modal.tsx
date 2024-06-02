'use client'

import { useRouter } from "next/navigation"
import { GBFWeaponSearch } from "./gbf-search"
import { Modal, Tile } from "../base/base-components"
import { useContext } from "react"
import { GBFWeaponGridContext } from "../../calc/gbfcalcContext"

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

const weaponList = [
  {name: 'Phoenix Torch', id: 0},
  {name: 'Ereshkigal', id: 1},
  {name: 'Murcielago', id: 2},
  {name: 'Photon Blaster', id: 3},
]

export function GBFWepGridModal() {  
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()

  return (
      <Modal title="GBF Weapons">
          <GBFWeaponSearch />
          <div className="grid text-black">
          {weaponList.map( item => {
            return (
                <Tile key={item.id} onClick={() => {gbfContext.setWeaponToTile(item); router.back()}}>
                  {item.name}
                </Tile>
            )
          })}
          </div>
      </Modal>
  )
}