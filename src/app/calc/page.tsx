import { NumberAnimator } from "../components/gbf-dmg-formula"
import { WeaponTile, SummonTile } from "../components/gbf_tile"

const formulaMods = {
    'Total': {
      num: 0,
    },
    'Magna': {
        num: 0,
      },
    'Normal': {
      num: 25,
    },
    'EX': {
      num: 100,
    },
}

export default function CalculatorPage() {
    return (
        <div>
            <h1 className="font-bold text-2xl">Calculator Page</h1>
            <div className="pl-6">
                <div className="mt-6 mb-12">
                    <h2>Weapon Grid</h2>
                    <div className="grid grid-rows-3 grid-cols-4 w-96">
                        <div className="row-span-3">
                            <WeaponTile />
                        </div>
                        <WeaponTile />
                        <WeaponTile />
                        <WeaponTile />
                        <WeaponTile />
                        <WeaponTile />
                        <WeaponTile />
                        <WeaponTile />
                        <WeaponTile />
                        <WeaponTile />
                    </div>
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
                    <div className="flex flex-row gap-4 text-center">
                        {Object.entries(formulaMods).map(([modName, { num }]) => {
                            return (
                                <div>
                                    <NumberAnimator initialValue={num} targetValue={100} />
                                    {modName}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}