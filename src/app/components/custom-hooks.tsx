import { useEffect, useState } from "react";
import { fetchWeapons } from "./calc/actions";
import { Weapon } from "../calc/gbfcalcContext";

// TEMPORARY UNTIL I SET UP A SUMMON ENDPOINT
const summonList = [
    {name: 'Optimus 150', id: 0, type: 'Optimus', strength: 150},
    {name: 'Optimus 160', id: 1, type: 'Optimus', strength: 160},
    {name: 'Optimus 170', id: 2, type: 'Optimus', strength: 170},
    {name: 'Elemental 150', id: 3, type: 'Elemental', strength: 150},
    {name: 'Magna 140', id: 4, type: 'Magna', strength: 140},
    {name: 'Magna 150', id: 5, type: 'Magna', strength: 150},
    {name: 'Magna 160', id: 6, type: 'Magna', strength: 160},
    {name: 'Magna 170', id: 7, type: 'Magna', strength: 170},
]

// CUSTOM HOOK
export function useWeaponListData() {
    const [data, setData] = useState<any[]>([])
    const [query, setQuery] = useState<{ [key: string]: string}>({
        query: "",
        searchby: "name", // value can be: name, ca_desc, skill
        element: "",
        wep_type: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await fetchWeapons(`?${query.searchby}=${query.query}${query.element !== "" ? "&element="+query.element : ""}${query.wep_type !== "" ? "&wep_type="+query.wep_type : ""}`)
            const weaponListResult = response.map((data:any, i:number) => {
                let weapon = adaptToWeaponModel(data)
                weapon.id = i
                return weapon
            })
            setData(weaponListResult)
            setIsLoading(false)
        }

        if (query.query) {
            fetchData().catch((error:any) => {
                // DO SOMETHING ON ERROR
                console.log("There was an error :(")
            })
        }
        
    }, [query])

    return [data, isLoading, query, setQuery] as const
}

export function useWeaponData(id: string) {
    const [data, setData] = useState<Weapon | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchWeapons(`/${id}`)
            const weaponResult = adaptToWeaponModel(response)
            setData(weaponResult)
        }

        fetchData().catch((error:any) => {
            // DO SOMETHING ON ERROR. ERROR IM LOOKING FOR IS NETWORK
            console.log("There was an error :(")
        })
        
    }, [id])

    return data
}

export function useSummonData() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            setData(summonList)
        }

        fetchData()
    }, [])

    return data
}

function adaptToWeaponModel(data:any) : Weapon {
    let skill_level = 10
    if (data.LvlTwoHundredAtk != undefined) {
        skill_level = 20
    } else if (data.LvlOnefiftyAtk != undefined) {
        skill_level = 15
    }

    return {
            name: data.Name, 
            id: 1, // Default value for id, change it if need be
            skillLevel: skill_level, 
            element: data.Element,
            weptype: data.WeaponType,
            description: data.Description,
            ougi_name: data.OugiName,
            ougi_desc: data.OugiDesc,
            skills: data.Skills ? adaptToSkillModel(data.Skills, skill_level) : [],
            awakening: {"atk": {"ex atk": 30, "hp": 30, "norm atk": 20}, "def": {"hp": 50}},
            picture: `data:image/jpg;base64,${data.Image64}`
    }
}

function adaptToSkillModel(skills:any[], level:number) {
    return skills.map((skill:any) => {
        let strengthDict : {[key: string]: number} = {}

        // Grab the strongest level of skill
        let skill_strength = skill.SkillLvlTen
        switch (level) {
            case 15:
                skill_strength = skill.SkillLvlFifteen
                break
            case 20:
                skill_strength = skill.SkillLvlTwenty
                break
            default:
                break
        }

        // In case my backend is lacking. Remove at a later date potentially? Or change the response to it
        if (skill_strength === undefined) {
            throw Error(`Missing skill strength for the skill: ${skill.Name} at ${level} in database. Please fix backend.`)
        }

        if (skill.StatAffected.includes('/')) {
            const backendStatList = skill.StatAffected.split('/')
            const backendStrengthList = skill_strength.split('/')
            for (let stat_index in backendStatList) {
                strengthDict[backendStatList[stat_index].toLowerCase()] = parseFloat(backendStrengthList[stat_index])
            }
        } else {
            strengthDict[skill.StatAffected.toLowerCase()] = parseFloat(skill_strength)
        }

        return {
            name: skill.Name,
            description: skill.Description,
            strength: strengthDict,
            type: skill.BoostType.toLowerCase(),
            stat: skill.StatAffected.toLowerCase(),
        }
    })
}

function adaptToAwakeningModel(awakenings:any[]) {
    return awakenings.map((awakening: any) => {
        return {
            
        }
    })
}

function useDataTemplate(url: string) {
    const [query, setQuery] = useState<{ [key: string]: string}>({
        query: "blah"
    })
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    // const [token, setToken] = useState<CancelTokenSource>(undefined)

    useEffect(() => {
        //const dataURL = url
        async function fetchData() {
            setError("")
            setLoading(true)
            setData([])

            //const response = await fetchWeapons(dataURL)
            //setData(response)
            setLoading(false)
        }

        fetchData().catch((error : any) => {
            if (error.message) {
                const msg: string = error.message
                setError(msg)
            }
        })
    }, [query])

    return [data, query, setQuery, loading, error] as const
}
