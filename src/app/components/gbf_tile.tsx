'use client'

import Image from 'next/image'

import { useState } from 'react'

interface TileProps {
  onClick?: () => void
  children: any
}

interface GBFTileProps {
  img?: string
}

export function Tile({onClick, children}: TileProps) {
  return (
    <button>{children}</button>
  )
}

export function WeaponTile({img}: GBFTileProps) {

  const [tileImage, setTileImage] = useState<string>(img ? img : '/empty_wep_slot.png')

  return (
    <Tile>
      <Image src={tileImage} alt='Weapon Tile' width={150} height={150} />
    </Tile>
  )
}

export function SummonTile({img}: GBFTileProps) {
  
  const [tileImage, setTileImage] = useState<string>(img ? img : '/empty_summon_slot.png')

  return (
    <button>
      <Image src={tileImage} alt='Weapon Tile' width={150} height={150} />
    </button>
  )
}