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
    const cancelObj = new AbortController()
    const signal = cancelObj.signal
    let weaponList:any = []

    const res = await fetch(`${process.env.GBF_API_HOST}/v1/weapons${searchQuery}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GBF_API_KEY}`
        },
        signal
    }).then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch data for weapons')
        }
        weaponList = res.json()
    }).catch(error => {
        if (error.name === 'AbortError') {
            // Handle cancellations
        } else {
            // Handle other errors
        }
    }).finally(() => {

    })

    
    return weaponList
}