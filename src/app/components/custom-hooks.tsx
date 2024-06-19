import { useEffect, useState } from "react";
import { fetchWeapons } from "./calc/actions";
import { Weapon } from "../calc/gbfcalcContext";

// TEMPORARY UNTIL I SET UP A SUMMON ENDPOINT
const summonList = [
    {name: 'Zeus', id: 0, type: 'Optimus', strength: 100},
    {name: 'Zeph', id: 1, type: 'Optimus', strength: 100},
    {name: 'Bahamut', id: 2, type: 'Elemental', strength: 150},
    {name: 'Lumi 100', id: 3, type: 'Magna', strength: 100},
    {name: 'Lumi 140', id: 5, type: 'Magna', strength: 140},
    {name: 'Lumi 150', id: 4, type: 'Magna', strength: 150},
]

// CUSTOM HOOK
export function useWeaponListData() {
    const [data, setData] = useState<any[]>([])

    const refetchData = async (searchby:string, value:string) => {
        const res = await fetchWeapons(value == '' ? '' : `?${searchby}=${value}`)
        const processing = res.map((data:any, i:number) => {
            let weapon = adaptToWeaponModel(data)
            weapon.id = i
            return weapon
            /*return {
                name: data.Name, 
                id: i, 
                skillLevel: 10, 
                element: data.Element,
                weptype: data.WeaponType,
                description: data.Description,
                ouginame: data.OugiName,
                ougidescription: data.OugiDesc,
                skills: data.Skills ? adaptToCalculatorModel(data.Skills, 10) : []
            }*/
        })
        setData(processing)
    }

    useEffect(() => {
        const fetchData = async () => {
            const temp = await fetchWeapons('')
            const temp_two = temp.map((data:any, i:number) => {
                let weapon = adaptToWeaponModel(data)
                weapon.id = i
                return weapon
                /*return {
                    name: data.Name, 
                    id: i, 
                    skillLevel: 10, 
                    element: data.Element,
                    weptype: data.WeaponType,
                    description: data.Description,
                    ouginame: data.OugiName,
                    ougidescription: data.OugiDesc,
                    skills: data.Skills ? adaptToSkillModel(data.Skills, 10) : []
                }*/
            })
            setData(temp_two)
        }

        try {
            fetchData()
        } catch(err) {
            // DO SOMETHING ON ERROR. ERROR IM LOOKING FOR IS NETWORK ERROR
        }
        
    }, [])

    return [data, refetchData] as const
}

export function useWeaponData(id: string, setWeapon: any) {

    useEffect(() => {
        const fetchData = async (value:string) => {
            const rawData = await fetchWeapons(`/${value}`)
            const weaponResult = adaptToWeaponModel(rawData)
            setWeapon(weaponResult)
        }

        try {
            fetchData(id)
        } catch(err) {
            // DO SOMETHING ON ERROR. ERROR IM LOOKING FOR IS NETWORK
        }
        
    }, [id])
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
    if (data.LvlOnefiftyAtk != '') {
        skill_level = 15
    } else if (data.LvlTwoHundredAtk != '') {
        skill_level = 20
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
            skills: data.Skills ? adaptToSkillModel(data.Skills, skill_level) : []
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

