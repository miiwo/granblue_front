import { useEffect, useState } from "react";
import { fetchWeapons } from "./calc/actions";

// TEMPORARY UNTIL I SET UP A SUMMON ENDPOINT
const summonList = [
    {name: 'Zeus', id: 0, type: 'Optimus', strength: 100},
    {name: 'Zeph', id: 1, type: 'Optimus', strength: 100},
    {name: 'Bahamut', id: 2, type: 'Elemental', strength: 150},
]

// CUSTOM HOOK
export function useWeaponData() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const temp = await fetchWeapons()
            const temp_two = temp.map((d:any, i:number) => {
                return {name: d.Name, id: i, skillLevel: 10, skills: [{name: 'hi', description: 'Come back', strength: 100, type: 'Magna'}]}
            })
            setData(temp_two)
        }

        fetchData()
    }, [])

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