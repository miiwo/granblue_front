'use client'

import Image from 'next/image'

import { useContext } from 'react'
import { openSummonModal, openWeaponModal } from './actions'
import { Tile } from '../base/base-components'
import { GBFWeaponGridContext, Summon, Weapon } from '@/app/calc/gbfcalcContext'

interface GBFTileProps {
  basepath?: string
  weapon?: Weapon
  summon?: Summon
  weaponlink: string // If attached to a weapon grid, this is the key to corresponding weapon in the weapon grid
}

interface SummonTileProps {
  basepath?: string
  summon?: Summon
  link: string // If attached to a weapon grid, this is the key to corresponding weapon in the weapon grid
}

export function WeaponGridTile({basepath, weapon, weaponlink}: GBFTileProps) {
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
      <Tile onClick={onClick}>
        { weapon ? weapon.name : <Image src={tileImage} alt='Weapon Tile' width={150} height={150} />}
      </Tile>
  )
}

export function SummonTile({basepath, summon, link}:SummonTileProps) {
  const gbfContext = useContext(GBFWeaponGridContext)
  const tileImage = '/empty_summon_slot.png'

  function onClick() {
    gbfContext.setActiveWeaponKey(link)
    openSummonModal(basepath)
  }

  return (
    <Tile onClick={onClick}>
      { summon ? summon.name : <Image src={tileImage} alt='Weapon Tile' width={150} height={150} />}
    </Tile>
  )
}

export function GBFTile(item: Weapon | Summon) {
  let display, tileImage = ''

  if ('weaponProperty' in item) {
    display = item.name
    tileImage = '/empty_wep_slot.png'
  } else if ('summonProperty' in item) {
    display = item.name
    tileImage = '/empty_summon_slot.png'
  }

  return (
    <Tile>
      { item ? display : <Image src={tileImage} alt='GBF Image Tile' width={150} height={150} />}
    </Tile>
  )
}