'use client'

import Image from 'next/image'

import { useContext } from 'react'
import { openWeaponModal } from './actions'
import { Tile } from '../base/base-components'
import { GBFWeaponGridContext, Weapon } from '@/app/calc/gbfcalcContext'

interface GBFTileProps {
  basepath?: string
  weapon?: Weapon
  weaponlink?: string // If attached to a weapon grid, this is the key to corresponding weapon in the weapon grid
  preModalClick?: () => void
}

export function WeaponGridTile({basepath, weapon, weaponlink, preModalClick}: GBFTileProps) {
  const preModal = preModalClick ? preModalClick : () => {}
  const gbfContext = useContext(GBFWeaponGridContext)

  let tileImage = '/empty_wep_slot.png'

  if (weapon) {
    tileImage = weapon ? '/empty_wep_slot.png' : '/empty_wep_slot.png'
  }

  /*const setWeaponInGrid = () => {
    if (weaponlink && gbfContext && gbfContext.keyname) {
      gbfContext.keyname.current = weaponlink
      console.log(`active keyname is set to: ${gbfContext.keyname.current}`)
    }
  }*/

  function onClick() {
    preModal()
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

/*
<WeaponGridTile basepath="/calc" weapon={weaponGrid.wepTwo} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepThree} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepFour} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepFive} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepSix} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepSeven} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepEight} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepNine} />
                            <WeaponGridTile basepath="/calc" weapon={weaponGrid.wepTen} />
                            */