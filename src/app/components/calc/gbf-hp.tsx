'use client'

import { GBFWeaponGridContext } from "@/app/calc/gbfcalcContext"
import { useContext, useState } from "react"
import { NumberSliderProps } from "../base/base-components"

export function GBFSlider ({initialVal, children}: NumberSliderProps) {
    const gbfContext = useContext(GBFWeaponGridContext)
    const [sliderVal, setSliderVal] = useState(initialVal)

    function onMouseUp(event:any) {
        if (gbfContext.hp) {
            gbfContext.hp.current = event.target.value
        } 
        console.log(gbfContext.hp)
    }
    
    return (
        <div className="flex gap-5">
            <p>Health = {sliderVal}</p>
            <input type='range' min='1' max='100' value={sliderVal} onChange={(event) => { setSliderVal(parseInt(event.target.value)) }} onMouseUp={onMouseUp} />
        </div>
    )
}