'use client'

import { GBFWeaponGridContext, Weapon } from "@/app/calc/gbfcalcContext"
import { useContext } from "react"
import { SummonTile, WeaponGridTile } from "./gbf_tile"

export function WeaponGrid() {
    const { grid } = useContext(GBFWeaponGridContext)
    let mainhand: Weapon | undefined, rest
    ({ 'wepOne': mainhand, ...rest} = grid) // Destructuring assignment
    
    
    return (
        <div className="grid grid-rows-3 grid-cols-4 place-items-center">
            <div className="row-span-3 place-self-start">
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

export function SummonGrid() {
    const { summonGrid } = useContext(GBFWeaponGridContext)
    return (
        <div className="grid grid-cols-2 gap-4 place-items-center">
            <SummonTile basepath="/calc" link={"sumOne"} summon={summonGrid.sumOne} />
            <SummonTile basepath="/calc" link={"sumTwo"} summon={summonGrid.sumTwo} />
            <span className="text-center">Main</span>
            <span className="text-center">Friend</span>
        </div>
    )
}