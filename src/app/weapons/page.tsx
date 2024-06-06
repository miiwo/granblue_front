'use client'

import Image from 'next/image'
import { Search } from '../components/base/base-components'
import { useWeaponData } from '../components/custom-hooks'
import { useEffect, useState } from 'react'

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
                    <fieldset className="flex gap-3">
                        <div>
                            <input type="radio" name="weapon_search_filters" value="name" defaultChecked />
                            <label className="ml-1">Name</label>
                        </div>
                        
                        <div>
                            <input type="radio" name="weapon_search_filters" value="skill" />
                            <label className="ml-1">Weapon Skill</label>
                        </div>
                        
                        <div>
                            <input type="radio" name="weapon_search_filters" value="ca" />
                            <label className="ml-1">Ougi</label>
                        </div>
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
                        <button key={i} className="flex gap-3 bg-nordtwo hover:bg-nordblue ease-in duration-300 shadow-sm rounded-md pl-3 py-4">
                            <Image src="/empty_wep_slot.png" alt="Image of weapon" width={150} height={75} />
                            <span className="content-center">{wep.name}</span>
                        </button>
                    )
                })}
                Results: {weaponList.length}
            </div>
        </div>
    )
}