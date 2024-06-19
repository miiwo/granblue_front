'use client'

import { GBFWeaponGridContext } from "@/app/calc/gbfcalcContext"
import { useContext, useState } from "react"
import { NumberSliderProps } from "../base/base-components"
import React from "react"

export function GBFSlider ({initialVal, children}: NumberSliderProps) {
    const gbfContext = useContext(GBFWeaponGridContext)
    const [sliderVal, setSliderVal] = useState(initialVal)

    function onMouseUp(event:any) {
        if (gbfContext.hp) {
            gbfContext.hp.current = event.target.value
            gbfContext.updateDamageCalcs()
        } 
        //[&::-webkit-slider-thumb]:
    }
    
    return (
        <div className="flex gap-5">
            <p className="flex-initial 2xl:w-32">Health = {sliderVal}</p>
            <input type='range' min='1' max='100' value={sliderVal} onChange={(event) => { setSliderVal(parseInt(event.target.value)) }} onMouseUp={onMouseUp} 
            className="basis-1/3 bg-transparent gbf-slider" />
        </div>
    )
}

export function GBFMCElement () {
    const gbfContext = useContext(GBFWeaponGridContext)
    const [elementSelect, setElementSelect] = useState(gbfContext.mcElement?.current)

    return (
        <React.Fragment>
            <span>MC Element: </span>
            <select className="h-10 text-nordzero rounded px-2 text-center" value={elementSelect} 
                onChange={e => { 
                    if (gbfContext.mcElement) {
                        setElementSelect(e.target.value); 
                        gbfContext.mcElement.current = e.target.value 
                }}}>
                <option value='Fire'>Fire</option>
                <option value='Water'>Water</option>
                <option value='Earth'>Earth</option>
                <option value='Wind'>Wind</option>
                <option value='Light'>Light</option>
                <option value='Dark'>Dark</option>
            </select>
        </React.Fragment>
        
    )
}