'use client'

import Image from 'next/image'

import { useContext } from 'react'
import { openWeaponModal } from './actions'
import { Tile } from '../base/base-components'
import { GBFWeaponGridContext, Weapon } from '@/app/calc/gbfcalcContext'

interface GBFTileProps {
  basepath?: string
  weapon?: Weapon
  weaponlink: string // If attached to a weapon grid, this is the key to corresponding weapon in the weapon grid
}

export function WeaponGridTile({basepath, weapon, weaponlink}: GBFTileProps) {
  const gbfContext = useContext(GBFWeaponGridContext)

  let tileImage = '/empty_wep_slot.png'

  if (weapon) {
    tileImage = weapon ? '/empty_wep_slot.png' : '/empty_wep_slot.png'
  }

  function onClick() {
    gbfContext.setActiveWeaponKey(weaponlink)
    openWeaponModal(basepath)
  }

  return (
      <Tile onClick={onClick}>
        { weapon ? weapon.name : <Image src={tileImage} alt='Weapon Tile' width={150} height={150} />}
      </Tile>
  )
}

export function SummonTile() {
  const tileImage = '/empty_summon_slot.png'

  return (
    <button>
      <Image src={tileImage} alt='Weapon Tile' width={150} height={150} />
    </button>
  )
}