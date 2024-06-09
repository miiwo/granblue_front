import { useEffect, useState } from "react";
import { fetchWeapons } from "./calc/actions";

// TEMPORARY UNTIL I SET UP A SUMMON ENDPOINT
const summonList = [
    {name: 'Zeus', id: 0, type: 'Optimus', strength: 100},
    {name: 'Zeph', id: 1, type: 'Optimus', strength: 100},
    {name: 'Bahamut', id: 2, type: 'Elemental', strength: 150},
    {name: 'Lumi', id: 3, type: 'Magna', strength: 100},
]

// CUSTOM HOOK
export function useWeaponData() {
    const [data, setData] = useState<any[]>([])

    const refetchData = async (value:string) => {
        const res = await fetchWeapons(`?name=${value}`)
        const processing = res.map((data:any, i:number) => {
            return {
                name: data.Name, 
                id: i, 
                skillLevel: 1, 
                skills: data.Skills ? adaptToCalculatorModel(data.Skills) : []
            }
        })
        setData(processing)
    }

    useEffect(() => {
        const fetchData = async () => {
            const temp = await fetchWeapons('')
            const temp_two = temp.map((data:any, i:number) => {
                return {
                    name: data.Name, 
                    id: i, 
                    skillLevel: 1, 
                    skills: data.Skills ? adaptToCalculatorModel(data.Skills) : []
                }
            })
            setData(temp_two)
        }

        fetchData()
    }, [])

    return [data, refetchData] as const
}

function adaptToCalculatorModel(skills:any[]) {
    return skills.map((skill:any) => {
        return {
            name: skill.Name,
            description: skill.Description,
            strength: isNaN(skill.SkillLvlOne) ? 0 : parseFloat(skill.SkillLvlOne),
            type: skill.BoostType.toLowerCase(),
            stat: skill.StatAffected.toLowerCase(),
        }
    })
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