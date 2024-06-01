'use client'

import { createContext, useCallback, useState } from 'react'

export type Weapon = {
    name: string | undefined
}
export type WeaponGrid = Record<string, Weapon | undefined>

type GBFWeaponGridContextProps = {
    children: React.ReactNode
}

const initialWeaponGrid: WeaponGrid = {
    'wepOne': {name: 'Photon Laser'}, 
    'wepTwo': undefined,
    'wepThree': undefined,
    'wepFour': undefined,
    'wepFive': undefined,
    'wepSix': undefined,
    'wepSeven': undefined,
    'wepEight': undefined,
    'wepNine': {name: 'Phoenix Torch'},
    'wepTen': undefined,
}

/*
const GBFWeaponGridContext = createContext({
    'wepOne': () => {}, 
    'wepTwo': () => {}, 
    'wepThree': () => {}, 
    'wepFour': () => {}, 
    'wepFive': () => {}, 
    'wepSix': () => {},
    'wepSeven': () => {}, 
    'wepEight': () => {}, 
    'wepNine': () => {}, 
    'wepTen': () => {}, 
})
*/

    /*const [weaponGrid, setWeaponGrid] = useState<WeaponGrid>({
        'wepOne': {name: 'Buster Blade'}, 
        'wepTwo': undefined,
        'wepThree': undefined,
        'wepFour': undefined,
        'wepFive': undefined,
        'wepSix': undefined,
        'wepSeven': undefined,
        'wepEight': undefined,
        'wepNine': {name: 'Phoenix Torch'},
        'wepTen': undefined,
    })*/

/*
const value = {
        'wepOne': () => {}, 
        'wepTwo': () => {}, 
        'wepThree': () => {}, 
        'wepFour': () => {}, 
        'wepFive': () => {}, 
        'wepSix': () => {},
        'wepSeven': () => {}, 
        'wepEight': () => {}, 
        'wepNine': () => {}, 
        'wepTen': () => {}, 
    }*/

export const GBFWeaponGridContext = createContext({
    'grid': initialWeaponGrid
})

export function GBFWeaponGridContextProvider({children}:GBFWeaponGridContextProps) {
    const [grid, setGrid] = useState(initialWeaponGrid)

    const onTileClick = useCallback((keyName: string) => {
        const _grid = {...grid, [keyName]: 'a'}
    }, [grid])

    return (
        <GBFWeaponGridContext.Provider value={{
            grid,
        }}
        >
            {children}
        </GBFWeaponGridContext.Provider>
    )
}

