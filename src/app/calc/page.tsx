'use client'

import { useState, useContext } from "react"
import { NumberSlider } from "../components/base/base-components"
import { NumberAnimator } from "../components/gbf-dmg-formula"
import { GBFWepGridModal } from "../components/gbf_modal"
import { GBFWeaponGridContext, GBFWeaponGridContextProvider } from "./gbfcalcContext"
import { WeaponGridTile, SummonTile } from "../components/tile/gbf_tile"

const formulaMods = {
    'Total': {
      num: 0,
      mulx: '=',
    },
    'Magna': {
        num: 0,
        mulx: 'x',
      },
    'Normal': {
      num: 25,
      mulx: 'x',
    },
    'EX': {
      num: 100,
      mulx: '',
    },
} // Move this to gbfcalcContext later

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined
}

export default function CalculatorPage({ searchParams }: SearchParamProps) {

    const shouldDisplayWeaponModal = searchParams?.wepmodal;
    const [hpPercent, setHpPercent] = useState(50)
    const { grid } = useContext(GBFWeaponGridContext)

    return (
        <div>
            <h1 className="font-bold text-2xl">Calculator Page</h1>
                <div className="pl-6">
                    <div className="mt-6 mb-12">
                        <h2 className="font-bold text-xl mb-6">Weapon Grid</h2>
                        <div className="grid grid-rows-3 grid-cols-4 w-96">
                            <div className="row-span-3">
                                <WeaponGridTile basepath="/calc" weapon={grid.wepOne} weaponlink="wepOne" />
                            </div>
                            {Object.keys(grid).map((keyName:string) => {
                                return (
                                    <WeaponGridTile key={keyName} weaponlink={keyName} basepath={"/calc"} weapon={grid[keyName]} />
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <p>Health = {hpPercent}</p>
                        <NumberSlider initialVal={hpPercent}/>
                    </div>

                    <div className="my-12">
                        <h2>Summons</h2>
                        <div className="grid grid-cols-2  gap-4 w-64">
                            <SummonTile />
                            <SummonTile />
                        </div>
                    </div>

                    <div className="my-12">
                        <h2>Damage Formula</h2>
                        <div className="flex flex-row gap-12 text-center">
                            {Object.entries(formulaMods).map(([modName, { num, mulx }]) => {
                                return (
                                    <div key={modName} className="flex flex-row gap-12">
                                        <div>
                                            <NumberAnimator initialValue={num} targetValue={100} />
                                            {modName}
                                        </div>
                                        {mulx !== '' ? <div>{mulx}</div> : <></>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {shouldDisplayWeaponModal && <GBFWepGridModal />}

                </div>
        </div>
    )
}