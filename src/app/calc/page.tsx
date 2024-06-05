'use client'

import { GBFSumGridModal, GBFWepGridModal } from "../components/calc/gbf_modal"
import { GBFWeaponGridContextProvider } from "./gbfcalcContext"
import { SummonGrid, WeaponGrid } from "../components/calc/gbf-grids"
import { GBFSlider } from "../components/calc/gbf-hp"
import { DMGFormula } from "../components/calc/gbf-dmg-formula"
import { ActiveModTable } from "../components/calc/gbf-active-mods"


type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined
}

export default function CalculatorPage({ searchParams }: SearchParamProps) {
    const shouldDisplayWeaponModal = searchParams?.wepmodal
    const shouldDisplaySummonModal = searchParams?.summodal

    return (
        <div>
            <GBFWeaponGridContextProvider>
            <h1 className="font-bold text-2xl text-nordwhite underline underline-offset-4">Calculator</h1>
                <div className="pl-6">
                    <div className="mt-6 mb-12 bg-nordtwo rounded px-5 py-5">
                        <h2 className="font-bold text-xl mb-6 text-nordwhite">Weapon Grid</h2>
                        <WeaponGrid />
                    </div>

                    <div className="my-12 bg-nordtwo rounded px-5 py-5">
                        <GBFSlider initialVal={50} />
                    </div>

                    <div className="my-12 bg-nordtwo rounded px-5 py-5">
                        <h2 className="font-bold text-xl mb-6 text-nordwhite">Summons</h2>
                        <SummonGrid />
                    </div>

                    <div className="my-12 bg-nordtwo rounded px-5 py-5">
                        <h2 className="font-bold text-xl mb-6 text-nordwhite">Damage Formula</h2>
                        <DMGFormula />
                    </div>

                    <div className="bg-nordtwo rounded px-5 py-5">
                        <h2 className="font-bold text-xl mb-6 text-nordwhite">Damage Mods</h2>
                        <ActiveModTable />
                    </div>

                    {shouldDisplayWeaponModal && <GBFWepGridModal />}
                    {shouldDisplaySummonModal && <GBFSumGridModal />}

                </div>
            </GBFWeaponGridContextProvider>
        </div>
    )
}