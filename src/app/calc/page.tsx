import { NumberAnimator } from "../components/gbf-dmg-formula"
import { GBFWepModal } from "../components/gbf_modal"
import { WeaponTile, SummonTile } from "../components/tile/gbf_tile"

const formulaMods = {
    'Total': {
      num: 0,
      mulx: '=',
      id: 0
    },
    'Magna': {
        num: 0,
        mulx: 'x',
        id: 1
      },
    'Normal': {
      num: 25,
      mulx: 'x',
      id: 2
    },
    'EX': {
      num: 100,
      mulx: '',
      id: 3
    },
}

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined
}

export default function CalculatorPage({ searchParams }: SearchParamProps) {

    const showwep = searchParams?.wepmodal;

    return (
        <div>
            <h1 className="font-bold text-2xl">Calculator Page</h1>
            <div className="pl-6">
                <div className="mt-6 mb-12">
                    <h2>Weapon Grid</h2>
                    <div className="grid grid-rows-3 grid-cols-4 w-96">
                        <div className="row-span-3">
                            <WeaponTile basepath="/calc"/>
                        </div>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
                        <WeaponTile basepath="/calc"/>
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
                    <div className="flex flex-row gap-12 text-center">
                        {Object.entries(formulaMods).map(([modName, { num, mulx, id }]) => {
                            return (
                                <div key={id} className="flex flex-row gap-12">
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

                {showwep && <GBFWepModal />}

            </div>
        </div>
    )
}