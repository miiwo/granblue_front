'use server'

import { redirect } from "next/navigation"

export async function openWeaponModal(basepath: string | undefined) {
    const clickPath = basepath ? basepath+'?wepmodal=true' : '?wepmodal=true'
    return redirect(clickPath)
}