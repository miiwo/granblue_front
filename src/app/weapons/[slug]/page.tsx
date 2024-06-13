'use client'

import { Weapon } from "@/app/calc/gbfcalcContext"
import { Search } from "@/app/components/base/base-components"
import { useWeaponData } from "@/app/components/custom-hooks"
import Image from 'next/image'
import { useState } from "react"

export default function Page({ params }: { params: { slug: string} }) {

    const weaponSkills = [
        {name: 'Skill 1', type: 'magna', strength: 20, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Skill 2', type: 'magna', strength: 20, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Skill 3', type: 'magna', strength: 20, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    ]

    /*const [weapon, setWeapon] = useState<Weapon | any | null>({
        id: 0,
        name: 'CPR',
        element: 'Wind',
        ougi_name: 'Zephium',
        ougi_desc: 'This is where the ougi description goes. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. In fermentum posuere urna nec tincidunt praesent.',
        skillLevel: 10,
        skills: weaponSkills
    })*/
    const [weapon, setWeapon] = useState<Weapon>()
    useWeaponData(params.slug, setWeapon)

    
    const searchOtherWeapons = () => {
        // Retrieve information for the one weapon
        //setWeapon()
    }

    // Set some sort of loading state
    if (!weapon) {
        return <h1>No weapon can be displayed</h1>
    }

    // Search bar still there so it can be used to search for others. Provides a dropdown of what weapons to choose from

    return (
        <div className="mx-6">
            <Search onClick={searchOtherWeapons} />
            <div className="z-20">Suggestions dropdown list appears here.</div>

            <div className="grid md:grid-row-6 md:grid-cols-5 mt-12 gap-5">
                <div className="md:row-span-3 md:col-span-2 place-self-center bg-nordtwo">
                    <Image src={'/zephium.png'} alt={'Picture of weapon'} width={250} height={250} />
                </div>

                <div className="bg-nordtwo rounded py-3 pl-4">
                    <p>Name: {decodeURIComponent(params.slug)}</p>
                </div>

                <div className="bg-nordtwo rounded py-3 pl-4">
                    <p>Type: {weapon.weptype}</p>
                </div>

                <div className="bg-nordtwo rounded py-3 pl-4">
                    <p>Element: {weapon.element}</p>
                </div>

                <div className="md:row-span-2 md:col-span-3 bg-nordtwo rounded px-5 pt-3 pb-2">
                    <p className="font-bold">Description </p>
                    <p>{weapon.description}</p>
                </div>

                

                <div className="md:col-span-5 bg-nordtwo rounded grid pl-3 pt-1 pb-3">
                    <p className="font-bold">Ougi</p>
                    <p>{weapon.ougi_name}</p>
                    <p>{weapon.ougi_desc}</p>
                </div>

                <div className="md:col-span-5 bg-nordtwo rounded pl-3 pt-1 mb-4">
                    <p className="mb-2 font-bold">Weapon Skills</p>
                    {weapon.skills?.map( (item, i) => {
                        return (
                            <div key={i} className="grid grid-cols-3 mb-3">
                                <p className="col-span-1">{item.name}</p>
                                <p className="col-span-2">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
            
        </div>
        
    )
}