'use client'

import Image from 'next/image'

import { useState } from 'react'
import { openWeaponModal } from './actions'
import { Tile } from '../base/base-components'
import { Weapon } from '@/app/calc/gbfcalcContext'

interface GBFTileProps {
  img?: string
  basepath?: string
  weapon?: Weapon
  weaponlink?: string | number
  preModalClick?: () => void
}

export function WeaponGridTile({img, basepath, weapon, preModalClick}: GBFTileProps) {
  const tileImage = img ? img : '/empty_wep_slot.png'
  const [wep, setWep] = useState(weapon)
  const preModal = preModalClick ? preModalClick : () => {}

  return (
      <Tile onClick={() => { preModal(); openWeaponModal(basepath) }}>
        { wep ? wep.name : <Image src={tileImage} alt='Weapon Tile' width={150} height={150} />}
      </Tile>
  )
}

export function SummonTile({img}: GBFTileProps) {
  const tileImage = img ? img : '/empty_summon_slot.png'

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