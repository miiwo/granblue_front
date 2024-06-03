'use client'

import { useState } from "react"
import { NumberSlider } from "../components/base/base-components"
import { NumberAnimator } from "../components/calc/gbf-dmg-formula"
import { GBFWepGridModal } from "../components/calc/gbf_modal"
import { GBFWeaponGridContextProvider } from "./gbfcalcContext"
import { SummonGrid, WeaponGrid } from "../components/calc/gbf-grids"

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
    const shouldDisplayWeaponModal = searchParams?.wepmodal
    const shouldDisplaySummonModal = searchParams?.summodal
    const [hpPercent, setHpPercent] = useState(50)

    return (
        <div>
            <GBFWeaponGridContextProvider>
            <h1 className="font-bold text-2xl">Calculator Page</h1>
                <div className="pl-6">
                    <div className="mt-6 mb-12">
                        <h2 className="font-bold text-xl mb-6">Weapon Grid</h2>
                        <WeaponGrid />
                    </div>

                    <div className="flex gap-5">
                        <p>Health = {hpPercent}</p>
                        <NumberSlider initialVal={hpPercent}/>
                    </div>

                    <div className="my-12">
                        <h2>Summons</h2>
                        <SummonGrid />
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
                    {shouldDisplaySummonModal}

                </div>
            </GBFWeaponGridContextProvider>
        </div>
    )
}