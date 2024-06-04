'use client'

import { MutableRefObject, createContext, useRef, useState } from 'react'

export type Weapon = {
    name: string | undefined,
    id: number,
    skills?: Skills[],
    series?: string,
    skillLevel: number,
    weaponProperty?: string
}

export type Skills = {
    name: string,
    description: string,
    strength: number,
    type: string,
}

export type Summon = {
    name: string | undefined,
    id: number,
    type: string,
    strength: number,
    summonProperty?: string
}

export type WeaponGrid = Record<string, Weapon | undefined>
export type SummonGrid = Record<string, Summon | undefined>

type GBFWeaponGridContextProps = {
    children: React.ReactNode
}
interface GBFWeaponGridContextData {
    grid: WeaponGrid,
    summonGrid: SummonGrid,
    keyname: MutableRefObject<string | undefined> | undefined,
    hp: MutableRefObject<number> | undefined,
    setActiveWeaponKey: (weaponlink: string | undefined) => void,
    setActiveSummonKey: (link: string | undefined) => void,
    setWeaponToTile: (weapon: Weapon) => void
    setSummonToTile: (summon: Summon) => void
}

const initialWeaponGrid: WeaponGrid = {
    'wepOne': {name: 'Photon Laser', id: 5, skillLevel: 10}, 
    'wepTwo': undefined,
    'wepThree': undefined,
    'wepFour': undefined,
    'wepFive': undefined,
    'wepSix': undefined,
    'wepSeven': undefined,
    'wepEight': undefined,
    'wepNine': {name: 'Phoenix Torch', id: 0, skillLevel: 15},
    'wepTen': undefined,
}

const initialSummonGrid: SummonGrid = {
    'sumOne': {name: 'Zeus', id: 0, type: 'Magna', strength: 100},
    'sumTwo': undefined
}

// Create context uses this default values for the context
export const GBFWeaponGridContext = createContext<GBFWeaponGridContextData>({
    grid: initialWeaponGrid,
    summonGrid: initialSummonGrid,
    keyname: undefined,
    hp: undefined,
    setActiveWeaponKey: (weaponlink) => {},
    setActiveSummonKey: (link) => {},
    setWeaponToTile: (weapon) => {},
    setSummonToTile: (summon) => {}
})

export function GBFWeaponGridContextProvider( {children}:GBFWeaponGridContextProps ) {
    const [grid, setGrid] = useState(initialWeaponGrid)
    const [summonGrid, setSummonGrid] = useState(initialSummonGrid)
    const keyname = useRef<string>()
    const hp = useRef<number>(50)

    const setActiveWeaponKey = (weaponlink: string | undefined) => {
        if (weaponlink) {
          keyname.current = weaponlink // I should only change this when it is in an event handler (onclick) or useeffect
          console.log(`active keyname is set to: ${keyname.current}`)
        }
    }

    const setActiveSummonKey = (link: string | undefined) => {
        if (link) {
            keyname.current = link
            console.log(`active keyname is set to: ${keyname.current}`)
        }
    }

    const setWeaponToTile = (weapon: Weapon) => {
        let _grid
        if (keyname.current) {
            _grid = {...grid, [keyname.current]: weapon}
            setGrid(_grid)
        }
    }

    const setSummonToTile = (summon: Summon) => {
        let _sumGrid
        if (keyname.current) {
            _sumGrid = {...summonGrid, [keyname.current]: summon}
            setSummonGrid(_sumGrid)
        }
    }

    return (
        <GBFWeaponGridContext.Provider value={{
            grid,
            summonGrid,
            keyname,
            hp,
            setActiveWeaponKey,
            setActiveSummonKey,
            setWeaponToTile,
            setSummonToTile,
        }}
        >
            {children}
        </GBFWeaponGridContext.Provider>
    )
}

