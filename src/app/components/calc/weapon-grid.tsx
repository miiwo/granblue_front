'use client'

import { GBFWeaponGridContext, Weapon } from "@/app/calc/gbfcalcContext"
import { useContext } from "react"
import { WeaponGridTile } from "./gbf_tile"

export function WeaponGrid() {

    const { grid } = useContext(GBFWeaponGridContext)
    let mainhand: Weapon | undefined, rest
    ({ 'wepOne': mainhand, ...rest} = grid)
    
    
    return (
        <div className="grid grid-rows-3 grid-cols-4 w-96">
            <div className="row-span-3">
                <WeaponGridTile basepath="/calc" weapon={mainhand} weaponlink="wepOne" />
            </div>
            {Object.keys(rest).map((keyName:string) => {
                return (
                    <WeaponGridTile key={keyName} weaponlink={keyName} basepath={"/calc"} weapon={grid[keyName]} />
                )
            })}
        </div>
    )
}