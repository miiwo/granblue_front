'use client'

import { GBFSumGridModal, GBFWepGridModal } from "../components/calc/gbf_modal"
import { GBFWeaponGridContextProvider } from "./gbfcalcContext"
import { SummonGrid, WeaponGrid } from "../components/calc/gbf-grids"
import { GBFMCElement, GBFSlider } from "../components/calc/gbf-hp"
import { DMGFormula } from "../components/calc/gbf-dmg-formula"
import { ActiveModTable } from "../components/calc/gbf-active-mods"
import { InlineImage } from "../components/base/base-components"


type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined
}

export default function CalculatorPage({ searchParams }: SearchParamProps) {
    const shouldDisplayWeaponModal = searchParams?.wepmodal
    const shouldDisplaySummonModal = searchParams?.summodal

    return (
        <div className="pb-3">
            <GBFWeaponGridContextProvider>
            <h1 className="font-bold text-2xl underline underline-offset-4 text-center">Calculator</h1>
                <div className="pl-6 grid grid-cols-2 gap-x-4 me-6">
                    <div className="col-span-2 md:col-span-1 mt-6 mb-5 bg-nordtwo rounded shadow-md px-5 py-5">
                        <h2 className="font-bold text-xl mb-6">Weapon Grid</h2>
                        <div className="2xl:mx-[10vw]"><WeaponGrid /></div>
                        
                    </div>

                    <div className="col-span-2 md:col-span-1 mt-6 mb-5 bg-nordtwo rounded shadow-md px-5 py-5 flex flex-col">
                        <h2 className="font-bold text-xl mb-14">Summons</h2>
                        <div><SummonGrid /></div>
                    </div>

                    <div className="content-center col-span-2 md:col-span-1 bg-nordtwo rounded shadow-md px-5 py-5 mb-5 md:mb-0 flex flex-col lg:flex-row items-center gap-16 2xl:gap-24">
                        <GBFSlider initialVal={50} />
                        <div className="flex gap-3 items-center">
                            <GBFMCElement />
                        </div>
                        
                    </div>

                    <div className="col-span-2 md:col-span-1 bg-nordtwo rounded shadow-md px-5 py-5">
                        <h2 className="font-bold text-xl mb-6">Damage Formula</h2>
                        <DMGFormula />
                    </div>

                    <div className="col-span-2 bg-nordtwo rounded shadow-md mt-5 px-5 py-5 mb-5">
                        <h2 className="font-bold text-xl mb-6">Important Mods</h2>
                        <ActiveModTable />
                    </div>

                    <div className="col-span-2 bg-nordtwo rounded shadow-md px-3 py-3 mb-5 flex flex-col gap-3">
                        <h3 className="font-bold">Damage Formula Explanation</h3>
                        <p>The damage formula depends on: Magna <InlineImage src={"/normal_atk_weapon_skill.png"} width={25} height={25} />, Normal <InlineImage src={"/normal_atk_weapon_skill.png"} width={25} height={25} />, and EX <InlineImage src={"/ex_atk_weapon_skill.png"} width={25} height={25} /> mods.
                            Multiplying the boosts you have between them leads to greater strength! You&apos;ll be surprised when the in-game calculator reports lower power but your experience in raids is different!
                            Take for example this: -insert example here-
                            You can get Elemental boosts from Summons, Progression, or Mk II Revans Awakening weapons.
                            There are extra weapon skills that contribute to power but are reliant on your HP. They are Stamina and Enmity.
                            These are the basics of the general damage formula.
                            There are other nuances such as your team comp which would favor other weapons moreso: skill supplemental, special CA specs, amplify NA, etc. This goes outside the explanations here.
                        </p>
                    </div>

                    <div className="col-span-2 bg-nordtwo rounded shadow-md px-3 py-3 mb-5 flex flex-col gap-3">
                        <h3 className="font-bold">Calculator Assumptions</h3>
                        <p><i>Current skill levels are assumed to be at the max level of their max weapon level.</i></p>
                        <p><i>Exception to the rule is Dark Opus, in which max level for it is 200.</i></p>
                        <p><i>There are no weapon restrictions in place, so be careful when making a grid.</i></p>
                        <p><i>Backend data is not fully there, so there will be weapons with missing skills for the time being until they get implemented.</i></p>
                        <p><i>Summons are currently to be assumed to be the same element as MC in case of calculations until implementation happens.</i></p>
                    </div>

                    {shouldDisplayWeaponModal && <GBFWepGridModal />}
                    {shouldDisplaySummonModal && <GBFSumGridModal />}

                </div>
            </GBFWeaponGridContextProvider>
        </div>
    )
}