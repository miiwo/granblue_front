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

const strengthMods = {
    'Crit': 25,
    'Might': 125,
}
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
                        <h2 className="font-bold text-xl mb-6">Summons</h2>
                        <SummonGrid />
                    </div>

                    <div className="my-12">
                        <h2 className="font-bold text-xl mb-6">Damage Formula</h2>
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

                    <div>
                        <h2 className="font-bold text-xl mb-6">Damage Mods</h2>
                        <table className="border-collapse table-auto w-3/4 text-left">
                            <thead className="bg-slate-900 dark:border-slate-600 text-slate-400 dark:text-slate-400">
                                <tr>
                                    <th className="border-b">Mod Name</th>
                                    <th className="border-b">Strength</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border-slate-100 dark:bg-slate-700">
                            {Object.keys(strengthMods).map(key => <tr key={key}><td className="border-b">{key}</td><td className="border-b">{String(strengthMods[key])}</td></tr>)}
                            </tbody>
                        </table>
                    </div>

                    {shouldDisplayWeaponModal && <GBFWepGridModal />}
                    {shouldDisplaySummonModal}

                </div>
            </GBFWeaponGridContextProvider>
        </div>
    )
}