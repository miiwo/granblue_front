import { GBFWeaponGridContext } from "@/app/calc/gbfcalcContext"
import { useContext } from "react"

export function ActiveModTable() {
    const {utilityMods} = useContext(GBFWeaponGridContext)
    
    return (
        <table className="border-collapse table-auto w-full text-left">
            <thead className="bg-nordzero border-slate-600">
                <tr>
                    <th className="border-b pl-3">Mod Name</th>
                    <th className="border-b pl-3">Strength</th>
                </tr>
            </thead>
            <tbody className="border-slate-100 bg-slate-700">
            {Object.keys(utilityMods).map(key => <tr key={key}><td className="border-b pl-3">{key}</td><td className="border-b pl-3">{String(utilityMods[key as keyof typeof utilityMods])}%</td></tr>)}
            </tbody>
        </table>
    )
}