'use server'

import { redirect } from "next/navigation"

// Anything in this file will return as a promise

export async function openWeaponModal(basepath: string | undefined) {
    const clickPath = basepath ? basepath+'?wepmodal=true' : '?wepmodal=true'
    return redirect(clickPath)
}

export async function openSummonModal(basepath: string | undefined) {
    const clickPath = basepath ? basepath + '?summodal=true' : '?summodal=true'
    return redirect(clickPath)
}

export async function fetchWeapons(searchQuery: string) {
    const res = await fetch(`${process.env.GBF_API_HOST}/v1/weapons${searchQuery}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GBF_API_KEY}`
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data for weapons')
    }
    const weaponList = await res.json()
    return weaponList
}