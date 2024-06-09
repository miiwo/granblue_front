'use client'

import Image from 'next/image'
import { AnimatedRadioGroup, AnimatedSixRadioGroup, Search } from '../components/base/base-components'
import { useWeaponData } from '../components/custom-hooks'
import { useEffect, useState } from 'react'
import Link from 'next/link'


export default function WeaponPage() {
    const [weaponList, refetchData] = useWeaponData()
    const [query, setQuery] = useState('')

    const onClick = () => {
        refetchData(query)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            if (query) {
                refetchData(query)
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [query])

    return (
        <div>
            <div className="flex flex-col gap-3 bg-nordtwo shadow-md pb-4 pt-1">
                <h1 className="font-bold text-2xl underline underline-offset-4 mb-3">Weapons</h1>
                <div className="bg-nordtwo rounded mx-3 py-5 px-3">
                    <Search onClick={onClick} placeholderText='Search weapons...' query={query} setQuery={setQuery} />
                </div>

                <div className="flex">
                    <span className='basis-32 text-right pr-5'>Search by:</span>
                    <fieldset className="shrink flex relative gap-3 rounded-lg bg-slate-700 w-96 text-center">
                        <input id="wep_name" type="radio" name="weapon_search_filters" value="name" defaultChecked className='hidden peer/name' />
                        <label htmlFor="wep_name" className="w-1/3 z-10 cursor-pointer px-3 rounded-lg">Name</label>

                        <input id="wep_skill" type="radio" name="weapon_search_filters" value="skill" className='hidden peer/skill' />
                        <label htmlFor='wep_skill' className="w-1/3 z-10 cursor-pointer ml-1 px-3 rounded-lg">Weapon Skill</label>

                        <input id="wep_ougi" type="radio" name="weapon_search_filters" value="ca" className='hidden peer/ca' />
                        <label htmlFor='wep_ougi' className="w-1/3 z-10 cursor-pointer ml-1 px-3 rounded-lg select-none truncate">Ougi</label>


                        <div className='flex w-1/3 px-3 rounded-lg bg-black z-[9] h-full p-0 select-none truncate absolute transform transition-transform peer-checked/ca:translate-x-[200%] peer-checked/skill:translate-x-[100%]'></div>
                        
                    </fieldset>
                </div>
                

                <div className="flex flex-row">
                    <span className='basis-32 text-right pr-5'>Element:</span>
                    <fieldset className='flex relative gap-3 rounded-lg bg-slate-700 w-3/4 text-center'>
                        <input id="elementRadioFire" type="radio" name="elementRadio" value="Fire" defaultChecked className='hidden peer/Fire' />
                        <label htmlFor="elementRadioFire" className="w-1/6 z-10 cursor-pointer px-3 rounded-lg">Fire</label>

                        <input id="elementRadioWater" type="radio" name="elementRadio" value="Water" className='hidden peer/Water' />
                        <label htmlFor='elementRadioWater' className="w-1/6 z-10 cursor-pointer ml-1 px-3 rounded-lg">Water</label>

                        <input id="elementRadioEarth" type="radio" name="elementRadio" value="Earth" className='hidden peer/Earth' />
                        <label htmlFor='elementRadioEarth' className="w-1/6 z-10 cursor-pointer ml-1 px-3 rounded-lg">Earth</label>

                        <input id="elementRadioWind" type="radio" name="elementRadio" value="Wind" className='hidden peer/Wind' />
                        <label htmlFor='elementRadioWind' className="w-1/6 z-10 cursor-pointer ml-1 px-3 rounded-lg">Wind</label>

                        <input id="elementRadioLight" type="radio" name="elementRadio" value="Light" className='hidden peer/Light' />
                        <label htmlFor='elementRadioLight' className="w-1/6 z-10 cursor-pointer ml-1 px-3 rounded-lg">Light</label>

                        <input id="elementRadioDark" type="radio" name="elementRadio" value="Dark" className='hidden peer/Dark' />
                        <label htmlFor='elementRadioDark' className="w-1/6 z-10 cursor-pointer ml-1 px-3 rounded-lg">Dark</label>


                        <div className='flex w-1/6 px-3 rounded-lg bg-black z-[9] h-full p-0 select-none truncate absolute transform transition-transform peer-checked/Fire:translate-x-[0%] peer-checked/Water:translate-x-[100%] peer-checked/Earth:translate-x-[200%] peer-checked/Wind:translate-x-[300%] peer-checked/Light:translate-x-[400%] peer-checked/Dark:translate-x-[500%]'></div>
                    </fieldset>
                </div>

                <div className="flex">
                    <span className='basis-32 text-right pr-5'>Weapon Type:</span>
                    <fieldset className='flex relative gap-3 rounded-lg bg-slate-700 w-[85%] text-center place-items-center'>
                        <input id="wepTypeRadioSpear" type="radio" name="wepTypeRadio" value="Spear" defaultChecked className='hidden peer/Spear' />
                        <label htmlFor="wepTypeRadioSpear" className="w-[10%] z-10 cursor-pointer px-3 rounded-lg">Spear</label>

                        <input id="wepTypeRadioBow" type="radio" name="wepTypeRadio" value="Bow" className='hidden peer/Bow' />
                        <label htmlFor='wepTypeRadioBow' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Bow</label>

                        <input id="wepTypeRadioAxe" type="radio" name="wepTypeRadio" value="Axe" className='hidden peer/Axe' />
                        <label htmlFor='wepTypeRadioAxe' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Axe</label>

                        <input id="wepTypeRadioDagger" type="radio" name="wepTypeRadio" value="Dagger" className='hidden peer/Dagger' />
                        <label htmlFor='wepTypeRadioDagger' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Dagger</label>

                        <input id="wepTypeRadioStaff" type="radio" name="wepTypeRadio" value="Staff" className='hidden peer/Staff' />
                        <label htmlFor='wepTypeRadioStaff' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Staff</label>

                        <input id="wepTypeRadioMelee" type="radio" name="wepTypeRadio" value="Melee" className='hidden peer/Melee' />
                        <label htmlFor='wepTypeRadioMelee' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Melee</label>

                        <input id="wepTypeRadioSword" type="radio" name="wepTypeRadio" value="Sword" className='hidden peer/Sword' />
                        <label htmlFor='wepTypeRadioSword' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Sword</label>

                        <input id="wepTypeRadioKatana" type="radio" name="wepTypeRadio" value="Katana" className='hidden peer/Katana' />
                        <label htmlFor='wepTypeRadioKatana' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Katana</label>

                        <input id="wepTypeRadioHarp" type="radio" name="wepTypeRadio" value="Harp" className='hidden peer/Harp' />
                        <label htmlFor='wepTypeRadioHarp' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Harp</label>

                        <input id="wepTypeRadioGun" type="radio" name="wepTypeRadio" value="Gun" className='hidden peer/Gun' />
                        <label htmlFor='wepTypeRadioGun' className="w-[10%] z-10 cursor-pointer ml-1 px-3 rounded-lg">Gun</label>



                        <div className='flex w-[10%] px-3 rounded-lg bg-black z-[9] h-full p-0 select-none truncate absolute transform transition-transform 
                        peer-checked/Spear:translate-x-[0%] peer-checked/Bow:translate-x-[100%] peer-checked/Axe:translate-x-[200%] 
                        peer-checked/Dagger:translate-x-[300%] peer-checked/Staff:translate-x-[400%] peer-checked/Melee:translate-x-[500%] 
                        peer-checked/Sword:translate-x-[600%] peer-checked/Katana:translate-x-[700%] peer-checked/Harp:translate-x-[800%]
                        peer-checked/Gun:translate-x-[900%]'
                        ></div>
                    </fieldset>
                    {/*<span>Weapon Type:</span>
                    <button>Spear</button>
                    <button>Bow</button>
                    <button>Axe</button>
                    <button>Dagger</button>
                    <button>Staff</button>
                    <button>Melee</button>
                    <button>Sword</button>
                    <button>Katana</button>
                    <button>Harp</button>
                    <button>Gun</button>*/}
                </div>

            </div>

            <div className="flex flex-col gap-3 mt-5 mx-3">
                {weaponList.map((wep, i) => {
                    return (
                        <Link key={i} href= {`/weapons/${encodeURIComponent(wep.name)}`} className="flex gap-3 bg-nordtwo hover:bg-nordblue ease-in duration-300 shadow-sm rounded-md pl-3 py-4">
                            <button>
                                <Image src="/empty_wep_slot.png" alt="Image of weapon" width={150} height={75} />
                                <span className="content-center">{wep.name}</span>
                            </button>
                        </Link>
                        
                    )
                })}
                Results: {weaponList.length}
            </div>
        </div>
    )
}