import { GBFWeaponGridContext } from "@/app/calc/gbfcalcContext"
import { useContext } from "react"

export function ActiveModTable() {
    const {utilityMods} = useContext(GBFWeaponGridContext)
    
    return (
        <table className="border-collapse table-auto w-full text-left">
            <thead className="bg-slate-900 dark:border-slate-600 text-slate-400 dark:text-slate-400">
                <tr>
                    <th className="border-b">Mod Name</th>
                    <th className="border-b">Strength</th>
                </tr>
            </thead>
            <tbody className="bg-white border-slate-100 dark:bg-slate-700">
            {Object.keys(utilityMods).map(key => <tr key={key}><td className="border-b">{key}</td><td className="border-b">{String(utilityMods[key as keyof typeof utilityMods])}%</td></tr>)}
            </tbody>
        </table>
    )
}