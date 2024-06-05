import { GBFWeaponGridContext } from "@/app/calc/gbfcalcContext"
import { useContext } from "react"

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

export function ActiveModTable() {
    const {utilityMods} = useContext(GBFWeaponGridContext)
    
    return (
        <table className="border-collapse table-auto w-3/4 text-left">
            <thead className="bg-slate-900 dark:border-slate-600 text-slate-400 dark:text-slate-400">
                <tr>
                    <th className="border-b">Mod Name</th>
                    <th className="border-b">Strength</th>
                </tr>
            </thead>
            <tbody className="bg-white border-slate-100 dark:bg-slate-700">
            {Object.keys(utilityMods).map(key => <tr key={key}><td className="border-b">{key}</td><td className="border-b">{String(strengthMods[key as keyof typeof strengthMods])}%</td></tr>)}
            </tbody>
        </table>
    )
}