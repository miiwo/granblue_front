'use client'
import { DMGFormulaPiece, GBFWeaponGridContext } from '@/app/calc/gbfcalcContext'
import {useContext} from 'react'

export function DMGFormula() {
    const {dmgFormulaMods} = useContext(GBFWeaponGridContext)

    return (
        <div className="flex flex-row gap-8 text-center">
            {Object.entries(dmgFormulaMods as DMGFormulaPiece).map(([key, value]) => {
                return (
                    <div key={key} className="flex flex-row gap-8">
                        <div>
                            <div>{value?.num ?? 0}%</div>
                            {key}
                        </div>
                        {value?.mulx !== '' ? <div>{value?.mulx}</div> : <></>}
                    </div>
                )
            })}
        </div>
    )
}