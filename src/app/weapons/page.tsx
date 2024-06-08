'use client'

import Image from 'next/image'
import { Search } from '../components/base/base-components'
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
            <div className="flex flex-col gap-3 bg-nordtwo shadow-md pb-2">
                <h1 className="font-bold text-2xl underline underline-offset-4 mb-3">Weapons</h1>
                <div className="bg-nordtwo rounded mx-3 mb-3 py-5 px-3">
                    <Search onClick={onClick} placeholderText='Search weapons...' query={query} setQuery={setQuery} />
                </div>

                <div className="flex flex-row gap-4">
                    <label>Search by:</label>
                    <fieldset className="flex relative gap-3 rounded-lg bg-slate-700 w-full">
                        <input id="wep_name" type="radio" name="weapon_search_filters" value="name" defaultChecked className='hidden peer/name' />
                        <label htmlFor="wep_name" className="w-1/4 z-10 cursor-pointer px-3 rounded-lg">Name</label>

                    
                        <input id="wep_skill" type="radio" name="weapon_search_filters" value="skill" className='hidden peer/skill' />
                        <label htmlFor='wep_skill' className="w-1/4 z-10 cursor-pointer ml-1 px-3 rounded-lg">Weapon Skill</label>

                        

                        <input id="wep_ougi" type="radio" name="weapon_search_filters" value="ca" className='appearance-none peer/ca' />
                        <label htmlFor='wep_ougi' className="w-1/4 z-10 cursor-pointer ml-1 px-3 rounded-lg select-none truncate uppercase">Ougi</label>


                        <div className='flex w-1/4 px-3 rounded-lg bg-black z-[9] h-full p-0 select-none truncate absolute transform transition-transform peer-checked/ca:translate-x-[200%] peer-checked/skill:translate-x-[100%]'></div>
                        
                    </fieldset>
                </div>
                

                <div className="flex gap-4">
                    <span>Element:</span>
                    <button>Fire</button>
                    <button>Water</button>
                    <button>Earth</button>
                    <button>Wind</button>
                    <button>Light</button>
                    <button>Dark</button>
                </div>

                <div className="flex gap-4">
                    <span>Weapon Type:</span>
                    <button>Spear</button>
                    <button>Bow</button>
                    <button>Axe</button>
                    <button>Dagger</button>
                    <button>Staff</button>
                    <button>Melee</button>
                    <button>Sword</button>
                    <button>Katana</button>
                    <button>Harp</button>
                    <button>Gun</button>
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