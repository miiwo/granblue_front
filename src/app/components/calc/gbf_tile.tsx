'use client'

import Image from 'next/image'
import emptyImage from '../../../../public/empty_wep_slot.png'

import { useContext } from 'react'
import { openSummonModal, openWeaponModal } from './actions'
import { Tile } from '../base/base-components'
import { GBFWeaponGridContext, Summon, Weapon } from '@/app/calc/gbfcalcContext'

interface GBFTileProps {
  basepath?: string
  weapon?: Weapon
  summon?: Summon
  weaponlink: string // If attached to a weapon grid, this is the key to corresponding weapon in the weapon grid
  customStyle?: string
}

interface SummonTileProps {
  basepath?: string
  summon?: Summon
  link: string // If attached to a weapon grid, this is the key to corresponding weapon in the weapon grid
}

export function WeaponGridTile({basepath, weapon, weaponlink, customStyle}: GBFTileProps) {
  const gbfContext = useContext(GBFWeaponGridContext)

  let tileImage = '/empty_wep_slot.png'

  if (weapon) {
    tileImage = weapon ? '' : '/empty_wep_slot.png'
  }

  function onClick() {
    gbfContext.setActiveWeaponKey(weaponlink)
    openWeaponModal(basepath)
  }

  return (
      <Tile customStyle={customStyle}>
        { weapon ? <div onClick={onClick}><img src={weapon.picture} alt={weapon.name} className='h-[75px] w-[200px] content-center'/></div> : <Image src={emptyImage} onClick={onClick} alt="Picture of weapon in grid" sizes="25vw" width={250} height={200} />}
        { weapon && weapon.awakening && 
          <select className='px-[59px] text-nordzero'  onChange={(e) => gbfContext.setAwakeningToTile(e.target.value)}>
            {Object.keys(weapon.awakening).map((key:string, i:number) => {
              return (
                <option key={"wep_awakening_" + weapon.id + "_" + i} value={key}>{key.toUpperCase()}</option>
              )
            })}
          </select> }
      </Tile>
  )
}

export function SummonTile({basepath, summon, link}:SummonTileProps) {
  const gbfContext = useContext(GBFWeaponGridContext)
  const tileImage = '/empty_summon_slot.png'

  function onClick() {
    gbfContext.setActiveSummonKey(link)
    openSummonModal(basepath)
  }

  return (
    <Tile onClick={onClick}>
      { summon ? <div className='flex w-[250px] h-[150px] items-center justify-center'>{summon.name}</div> : <Image src={tileImage} alt='Weapon Tile' sizes="25vw" width={250} height={200} />}
    </Tile>
  )
}