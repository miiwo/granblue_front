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
      <Tile onClick={onClick} customStyle={customStyle}>
        { weapon ? weapon.name : <Image src={emptyImage} alt="Picture of weapon in grid" />}
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
      { summon ? summon.name : <Image src={tileImage} alt='Weapon Tile' width={250} height={150} />}
    </Tile>
  )
}

/*export function GBFTile(item: Weapon | Summon) {
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
}*/