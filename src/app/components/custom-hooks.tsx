import { useEffect, useState } from "react";
import { fetchWeapons } from "./calc/actions";

// CUSTOM HOOK
export function useWeaponData() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const temp = await fetchWeapons()
            const temp_two = temp.map((d:any, i:number) => {
                return {name: d.Name, id: i}
            })
            setData(temp_two)
        }

        fetchData()
    }, [])

    return data
  }