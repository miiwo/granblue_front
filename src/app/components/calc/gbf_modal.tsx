'use client'

import { useRouter } from "next/navigation"
import { GBFWeaponSearch } from "./gbf-search"
import { Modal, Tile } from "../base/base-components"
import { useContext, useEffect, useState } from "react"
import { GBFWeaponGridContext, Weapon} from "../../calc/gbfcalcContext"
import { fetchWeapons } from "./actions"

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

const summonList = [
  {name: 'Zeus', id: 0},
  {name: 'Zeph', id: 1},
  {name: 'Bahamut', id: 2},
]

export function GBFWepGridModal() {  
  const gbfContext = useContext(GBFWeaponGridContext)
  const router = useRouter()
  const [weaponListv2, setWeaponList] = useState<Weapon[]>([])

  useEffect(() => {
    const modalFetch = async () => {
      const temp = await fetchWeapons()
      const temp_two = temp.map((d:any, i:number) => {
        return {name: d.Name, id: i}
      })
      setWeaponList(temp_two)
    }

    modalFetch()

  }, [])

  return (
      <Modal title="GBF Weapons">
          <GBFWeaponSearch />
          <div className="flex flex-col w-1/2 mt-5 text-black">
          {weaponListv2.map( item => {
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