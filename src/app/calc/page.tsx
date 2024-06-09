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
            <h1 className="font-bold text-2xl underline underline-offset-4">Calculator</h1>
                <div className="pl-6 grid grid-cols-2 gap-x-4 me-6">
                    <div className="col-span-2 md:col-span-1 mt-6 mb-5 bg-nordtwo rounded shadow-md px-5 py-5">
                        <h2 className="font-bold text-xl mb-6">Weapon Grid</h2>
                        <WeaponGrid />
                    </div>

                    <div className="col-span-2 md:col-span-1 mt-6 mb-5 bg-nordtwo rounded shadow-md px-5 py-5 flex flex-col">
                        <h2 className="font-bold text-xl mb-14">Summons</h2>
                        <SummonGrid />
                    </div>

                    <div className="content-center col-span-2 md:col-span-1 bg-nordtwo rounded shadow-md px-5 py-5">
                        <GBFSlider initialVal={50} />
                    </div>

                    <div className="col-span-2 md:col-span-1 bg-nordtwo rounded shadow-md px-5 py-5">
                        <h2 className="font-bold text-xl mb-6">Damage Formula</h2>
                        <DMGFormula />
                    </div>

                    <div className="col-span-2 bg-nordtwo rounded shadow-md mt-5 px-5 py-5">
                        <h2 className="font-bold text-xl mb-6">Damage Mods</h2>
                        <ActiveModTable />
                    </div>

                    {shouldDisplayWeaponModal && <GBFWepGridModal />}
                    {shouldDisplaySummonModal && <GBFSumGridModal />}

                </div>
            </GBFWeaponGridContextProvider>
        </div>
    )
}