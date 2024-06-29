'use client'

import { Search } from "@/app/components/base/base-components"
import { useWeaponData, useWeaponListData } from "@/app/components/custom-hooks"
import Image from 'next/image'

export default function Page({ params }: { params: { slug: string} }) {
    const weapon = useWeaponData(params.slug)
    const [weaponSearchList, isLoading, query, setQuery] = useWeaponListData()

    // Set some sort of loading state
    if (!weapon) {
        return <h1>No weapon can be displayed</h1>
    }

    // Search bar still there so it can be used to search for others. Provides a dropdown of what weapons to choose from

    return (
        <div className="mx-6">
            <Search query={query} setQuery={setQuery} />
            <div className="z-20">
                Suggestions dropdown list appears here.
                {weaponSearchList.map((item, i) => {
                    return <p key={i}>{item.name}</p>
                })}
                </div>

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