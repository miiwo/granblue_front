'use server'

import { redirect } from "next/navigation"

export async function openWeaponModal(basepath: string | undefined) {
    const clickPath = basepath ? basepath+'?wepmodal=true' : '?wepmodal=true'
    return redirect(clickPath)
}

export async function openSummonModal(basepath: string | undefined) {
    const clickPath = basepath ? basepath + '?summodal=true' : '?summodal=true'
    return redirect(clickPath)
}

export async function fetchWeapons() {
    const res = await fetch(`https://skyfaring-domain.xyz/v1/weapons`, {
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

/*const calculateGridMods = (weaponList, summonList, hp) => {
    let magna_atk = 0
    let normal_atk = 0
    let ex_atk = 0
    let magna_stam_atk = 0
    let normal_stam_atk = 0
    let magna_enm_atk = 0
    let normal_enm_atk = 0

    let bahamut_mod = 0
    let ultima_mod = 0
    let norm_atk_buffs = 0
    let go_aura = 0
    let norm_atk_debuffs = 0
    let ancestral_mod = 0

    // Sum up all the grid mods
    for (const wep of weaponList) {
        if (wep !== null) {

            // Skill 1
            if (wep.weapon_skill_one !== null) {
                if (wep.series.includes('Bahamut')) {
                    bahamut_mod += wep.weapon_skill_one.strength
                } else if (wep.weapon_skill_one.skill_type.includes('Magna')) {
                    magna_atk += wep.weapon_skill_one.strength
                } else if (wep.weapon_skill_one.skill_type.includes('Optimus')) {
                    if (wep.series.includes('Ancestral')) {
                        ancestral_mod += wep.weapon_skill_one.strength
                    } else {
                        normal_atk += wep.weapon_skill_one.strength
                    }
                    
                } else if (wep.weapon_skill_one.skill_type.includes('EX')) {
                    // Add condition to check for ultima series. Add the mod to ultima mod variable
                    ex_atk += wep.weapon_skill_one.strength
                } else if (wep.weapon_skill_one.skill_type.includes('M_Stam')) {
                    if (hp < 25) {
                        continue
                    } else if (wep.skill_level <= 15) {
                        magna_stam_atk += ((hp / (wep.weapon_skill_one.strength - wep.skill_level))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        magna_stam_atk += ((hp / (wep.weapon_skill_one.strength - (15 + (0.4 * (wep.skill_level-15)))))**2.9 + 2.1)/100
                    }
                } else if (wep.weapon_skill_one.skill_type.includes('M_Enm')) {
                    magna_enm_atk += wep.weapon_skill_one.strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
                } else if (wep.weapon_skill_one.skill_type.includes('O_Stam')) {
                    // TODO: Make one for fediel spine 
                    if (hp < 25) {
                        continue
                    } else if (wep.skill_level <= 15) {
                        normal_stam_atk += ((hp / (wep.weapon_skill_one.strength - wep.skill_level))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        normal_stam_atk += ((hp / (wep.weapon_skill_one.strength - (15 + (0.4 * (wep.skill_level-15)))))**2.9 + 2.1)/100
                    }
                } else if (wep.weapon_skill_one.skill_type.includes('O_Enm')) {
                    // TODO: Make one for wilnas fist
                    normal_enm_atk += wep.weapon_skill_one.strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
                }
            }
            // Skill 2
            if (wep.weapon_skill_two !== null) {
                if (wep.series.includes('Bahamut')) {
                    bahamut_mod += wep.weapon_skill_two.strength
                } else if (wep.weapon_skill_two.skill_type.includes('Magna')) {
                    magna_atk += wep.weapon_skill_two.strength
                } else if (wep.weapon_skill_two.skill_type.includes('Optimus')) {
                    if (wep.series.includes('Ancestral')) {
                        ancestral_mod += wep.weapon_skill_two.strength
                    } else {
                        normal_atk += wep.weapon_skill_two.strength
                    }
                    
                } else if (wep.weapon_skill_two.skill_type.includes('EX')) {
                    // Add condition to check for ultima series. Add the mod to ultima mod variable
                    ex_atk += wep.weapon_skill_two.strength
                } else if (wep.weapon_skill_two.skill_type.includes('M_Stam')) {
                    if (hp < 25) {
                        continue
                    } else if (wep.skill_level <= 15) {
                        magna_stam_atk += ((hp / (wep.weapon_skill_two.strength - wep.skill_level))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        magna_stam_atk += ((hp / (wep.weapon_skill_two.strength - (15 + (0.4 * (wep.skill_level-15)))))**2.9 + 2.1)/100
                    }
                } else if (wep.weapon_skill_two.skill_type.includes('M_Enm')) {
                    magna_enm_atk += wep.weapon_skill_two.strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
                } else if (wep.weapon_skill_two.skill_type.includes('O_Stam')) {
                    // TODO: Make one for fediel spine 
                    if (hp < 25) {
                        continue
                    } else if (wep.skill_level <= 15) {
                        normal_stam_atk += ((hp / (wep.weapon_skill_two.strength - wep.skill_level))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        normal_stam_atk += ((hp / (wep.weapon_skill_two.strength - (15 + (0.4 * (wep.skill_level-15)))))**2.9 + 2.1)/100
                    }
                } else if (wep.weapon_skill_two.skill_type.includes('O_Enm')) {
                    // TODO: Make one for wilnas fist
                    normal_enm_atk += wep.weapon_skill_two.strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
                }
            }
        } 
    }

    // Summon things
    let magna_summon = 1 
    let normal_summon = 1

    if (summonList[0] != null) {
        if (summonList[0].summon_type.includes('Magna')) {
            magna_summon += summonList[0].strength
        } else if (summonList[0].summon_type.includes('Normal')) {
            normal_summon += summonList[0].strength
        }
    }

    if (summonList[1] != null) {
        if (summonList[1].summon_type.includes('Magna')) {
            magna_summon += summonList[1].strength
        } else if (summonList[1].summon_type.includes('Normal')) {
            normal_summon += summonList[1].strength
        }
    }

    // Apply mod boosters
    magna_atk = magna_atk * magna_summon
    magna_stam_atk = magna_stam_atk * magna_summon
    magna_enm_atk = magna_enm_atk * magna_summon
    normal_atk = normal_atk * normal_summon
    normal_stam_atk = normal_stam_atk * normal_summon
    normal_enm_atk = normal_enm_atk * normal_summon

    // Misc random things
    normal_atk += bahamut_mod + ancestral_mod + norm_atk_buffs + go_aura - norm_atk_debuffs
    ex_atk += ultima_mod // only on main skill. If key, then it is normal
    // In case of 6D wep in grid

    return {
        total: (1 + magna_atk) * (1 + normal_atk) * (1 + ex_atk) * (1 + normal_stam_atk) * (1 + normal_enm_atk) * (1 + magna_stam_atk) * (1 + magna_enm_atk),
        magna: magna_atk,
        normal: normal_atk,
        ex: ex_atk,
        magna_stam: magna_stam_atk,
        normal_stam: normal_stam_atk,
        magna_enm: magna_enm_atk,
        normal_enm: normal_enm_atk
    }
}
*/

const calculateTotalBoosts = () => {

}