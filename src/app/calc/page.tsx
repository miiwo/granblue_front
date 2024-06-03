'use client'

import { NumberSlider } from "../components/base/base-components"
import { NumberAnimator } from "../components/calc/gbf-dmg-formula"
import { GBFSumGridModal, GBFWepGridModal } from "../components/calc/gbf_modal"
import { GBFWeaponGridContextProvider } from "./gbfcalcContext"
import { SummonGrid, WeaponGrid } from "../components/calc/gbf-grids"
import { GBFSlider } from "../components/calc/gbf-hp"

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
      mulx: 'x',
    },
    'Elemental': {
        num: 150,
        mulx: '',
    }
} // Move this to gbfcalcContext later

const strengthMods = {
    'Might': 125,
    'Omega Might': 10,
    'EX Might': 15,
    'EX Might Sp.': 80,
    'Stamina': 1,
    'Omega Stamina': 1,
    'Enmity': 1,
    'Omega Enmity': 1,
    'NA Cap': 10,
    'Skill DMG Cap': 15,
    'CA DMG Cap': 1,
    'DMG Cap': 15,
    'DMG Supp.': 10000,
    'Crit': 25,
    'HP': 350,
    'DEF': 150,
    'TA Rate': 25,
    'Heal Cap': 50,
    'DMG Cap (Sp.)': 14,
    'DMG Amp. (Non-elem Foe)': 10,
    'DMG Amp': 11,
    'NA Amp (Sp.)': 10,
    'CA Amp': 10,
    'Crit Amp': 20,
    'CA Amp (Arc)': 20,
}

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined
}

export default function CalculatorPage({ searchParams }: SearchParamProps) {
    const shouldDisplayWeaponModal = searchParams?.wepmodal
    const shouldDisplaySummonModal = searchParams?.summodal

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
                        <GBFSlider initialVal={50} />
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
                            {Object.keys(strengthMods).map(key => <tr key={key}><td className="border-b">{key}</td><td className="border-b">{String(strengthMods[key as keyof typeof strengthMods])}%</td></tr>)}
                            </tbody>
                        </table>
                    </div>

                    {shouldDisplayWeaponModal && <GBFWepGridModal />}
                    {shouldDisplaySummonModal && <GBFSumGridModal />}

                </div>
            </GBFWeaponGridContextProvider>
        </div>
    )
}