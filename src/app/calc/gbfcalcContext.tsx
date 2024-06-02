'use client'

import { MutableRefObject, createContext, useCallback, useRef, useState } from 'react'

export type Weapon = {
    name: string | undefined,
    id: number
}
export type WeaponGrid = Record<string, Weapon | undefined>

type GBFWeaponGridContextProps = {
    children: React.ReactNode
}

const initialWeaponGrid: WeaponGrid = {
    'wepOne': {name: 'Photon Laser', id: 5}, 
    'wepTwo': undefined,
    'wepThree': undefined,
    'wepFour': undefined,
    'wepFive': undefined,
    'wepSix': undefined,
    'wepSeven': undefined,
    'wepEight': undefined,
    'wepNine': {name: 'Phoenix Torch', id: 0},
    'wepTen': undefined,
}

interface GBFWeaponGridContextData {
    grid: WeaponGrid,
    keyname: MutableRefObject<string | undefined> | undefined,
    setActiveWeaponKey: (weaponlink: string | undefined) => void,
    setWeaponToTile: (weapon: Weapon) => void
}

// Create context uses this default values for the context
export const GBFWeaponGridContext = createContext<GBFWeaponGridContextData>({
    grid: initialWeaponGrid,
    keyname: undefined,
    setActiveWeaponKey: (weaponlink) => {},
    setWeaponToTile: (weapon) => {}
})

export function GBFWeaponGridContextProvider( {children}:GBFWeaponGridContextProps ) {
    const [grid, setGrid] = useState(initialWeaponGrid)
    const keyname = useRef<string>()

    const setActiveWeaponKey = (weaponlink: string | undefined) => {
        if (weaponlink) {
          keyname.current = weaponlink // I should only change this when it is in an event handler (onclick) or useeffect
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

    return (
        <GBFWeaponGridContext.Provider value={{
            grid,
            keyname,
            setActiveWeaponKey,
            setWeaponToTile,
        }}
        >
            {children}
        </GBFWeaponGridContext.Provider>
    )
}

