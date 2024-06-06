import { GBFWeaponSearch } from "../components/calc/gbf-search";
import Image from 'next/image'

export default function WeaponPage() {
    const weaponList = [
        {name: 'Ereshkigal'},
        {name: 'Phoenix Torch'},
        {name: 'Test Weapon'},
        {name: 'Test Weapon'},
        {name: 'Test Weapon'},
    ]

    return (
        <div>
            <div className="flex flex-col gap-3 bg-nordtwo shadow-md">
                {/* This is where I put the search bar beforehand */}

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
                        <div key={i} className="flex gap-3 bg-nordtwo hover:bg-nordblue ease-in duration-300 shadow-sm rounded-md pl-3 py-4">
                            <Image src="/empty_wep_slot.png" alt="Image of weapon" width={150} height={75} />
                            <span className="content-center">{wep.name}</span>
                        </div>
                    )
                })}
                Results: 3
            </div>
        </div>
    )
}