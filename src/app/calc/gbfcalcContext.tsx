'use client'

import { MutableRefObject, createContext, useRef, useState } from 'react'

// TYPES & INTERFACES
export type Weapon = {
    name: string | undefined,
    id: number,
    skills?: Skills[],
    series?: string,
    skillLevel: number,
    weaponProperty?: string,
    element: string,
    weptype: string,
    description: string,
    ougi_name: string,
    ougi_desc: string,
}

export type Skills = {
    name: string,
    description: string,
    strength: number,
    type: string,
    stat: string,
}

export type Summon = {
    name: string | undefined,
    id: number,
    type: string,
    strength: number,
    summonProperty?: string
}

export type WeaponGrid = Record<string, Weapon | undefined>
export type SummonGrid = Record<string, Summon | undefined>
export type DMGFormulaPiece = Record<string, {num: number, mulx: string} | undefined>

type GBFWeaponGridContextProps = {
    children: React.ReactNode
}

interface GBFWeaponGridContextData {
    grid: WeaponGrid,
    summonGrid: SummonGrid,
    dmgFormulaMods: {},
    utilityMods: {},
    keyname: MutableRefObject<string | undefined> | undefined,
    hp: MutableRefObject<number> | undefined,
    setActiveWeaponKey: (weaponlink: string | undefined) => void,
    setActiveSummonKey: (link: string | undefined) => void,
    setWeaponToTile: (weapon: Weapon) => void
    setSummonToTile: (summon: Summon) => void
}

// INITIAL VARIABLE DATA
const initialWeaponGrid: WeaponGrid = {
    'wepOne': undefined, 
    'wepTwo': undefined,
    'wepThree': undefined,
    'wepFour': undefined,
    'wepFive': undefined,
    'wepSix': undefined,
    'wepSeven': undefined,
    'wepEight': undefined,
    'wepNine': undefined,
    'wepTen': undefined,
}

const initialSummonGrid: SummonGrid = {
    'sumOne': undefined,
    'sumTwo': undefined
}

const formulaMods = {
    'Total': {
      num: 0,
      mulx: '=',
    },
    'Magna': {
        num: 0,
        mulx: 'x',
      },
    'Normal': {
      num: 0,
      mulx: 'x',
    },
    'EX': {
      num: 0,
      mulx: 'x',
    },
    'Elemental': {
        num: 0,
        mulx: '',
    }
}

const strengthMods = {
    'Might': 125,
    'Omega Might': 10,
    'EX Might': 15,
    'EX Might Sp.': 80,
    'Stamina': 1,
    'Omega Stamina': 1,
    'Enmity': 1,
    'Omega Enmity': 1,
    'NA Cap': 10,
    'Skill DMG Cap': 15,
    'CA DMG Cap': 1,
    'DMG Cap': 15,
    'DMG Supp.': 10000,
    'Crit': 25,
    'HP': 350,
    'DEF': 150,
    'TA Rate': 25,
    'Heal Cap': 50,
    'DMG Cap (Sp.)': 14,
    'DMG Amp. (Non-elem Foe)': 10,
    'DMG Amp': 11,
    'NA Amp (Sp.)': 10,
    'CA Amp': 10,
    'Crit Amp': 20,
    'CA Amp (Arc)': 20,
}

// Create context uses this default values for the context
export const GBFWeaponGridContext = createContext<GBFWeaponGridContextData>({
    grid: initialWeaponGrid,
    summonGrid: initialSummonGrid,
    dmgFormulaMods: {},
    utilityMods: {},
    keyname: undefined,
    hp: undefined,
    setActiveWeaponKey: (weaponlink) => {},
    setActiveSummonKey: (link) => {},
    setWeaponToTile: (weapon) => {},
    setSummonToTile: (summon) => {}
})

// PROVIDER
export function GBFWeaponGridContextProvider( {children}:GBFWeaponGridContextProps ) {
    const [grid, setGrid] = useState(initialWeaponGrid)
    const [summonGrid, setSummonGrid] = useState(initialSummonGrid)
    const [dmgFormulaMods, setDmgFormulaMods] = useState(formulaMods)
    const [utilityMods, setUtilityMods] = useState({
        'Might': 0, 'Omega Might': 0, 'EX Might': 0, 
        'Stamina': 0, 'Omega Stamina': 0,
        'Enmity': 0, 'Omega Enmity': 0,
        'Crit': 0, 'TA Rate': 0,} )
    const keyname = useRef<string>()
    const hp = useRef<number>(50)

    const setActiveWeaponKey = (weaponlink: string | undefined) => {
        if (weaponlink) {
          keyname.current = weaponlink // I should only change this when it is in an event handler (onclick) or useeffect
        }
    }

    const setActiveSummonKey = (link: string | undefined) => {
        if (link) {
            keyname.current = link
        }
    }

    const setWeaponToTile = (weapon: Weapon) => {
        let _grid: any
        let _sumGrid: any
        if (keyname.current) {
            _grid = {...grid, [keyname.current]: weapon}
            setGrid(_grid)

            _sumGrid = summonGrid
            const _dmgMods = calculateGridMods(Object.keys(_grid).map<Weapon>(key => _grid[key]), _sumGrid, hp.current)
            setDmgFormulaMods({
                'Total': {
                    num: _dmgMods.total,
                    mulx: '=',
                  },
                  'Magna': {
                      num: _dmgMods.magna,
                      mulx: 'x',
                    },
                  'Normal': {
                    num: _dmgMods.normal,
                    mulx: 'x',
                  },
                  'EX': {
                    num: _dmgMods.ex,
                    mulx: 'x',
                  },
                  'Elemental': {
                      num: 0,
                      mulx: '',
                  }
            })

            setUtilityMods({
                'Might': _dmgMods.normal,
                'Omega Might': _dmgMods.magna,
                'EX Might': _dmgMods.ex,
                'Stamina': _dmgMods.normal_stam,
                'Omega Stamina': _dmgMods.magna_stam,
                'Enmity': _dmgMods.normal_enm,
                'Omega Enmity': _dmgMods.magna_enm,
                'Crit': _dmgMods.crit,
                'TA Rate': _dmgMods.ta,
            })
            

        }
    }

    const setSummonToTile = (summon: Summon) => {
        let _sumGrid
        if (keyname.current) {
            _sumGrid = {...summonGrid, [keyname.current]: summon}
            setSummonGrid(_sumGrid)
        }
    }

    return (
        <GBFWeaponGridContext.Provider value={{
            grid,
            summonGrid,
            dmgFormulaMods,
            utilityMods,
            keyname,
            hp,
            setActiveWeaponKey,
            setActiveSummonKey,
            setWeaponToTile,
            setSummonToTile,
        }}
        >
            {children}
        </GBFWeaponGridContext.Provider>
    )
}

export const calculateGridMods = (weaponList: Weapon[], summonList: Summon[], hp: number) => {
    let magna_atk = 0
    let normal_atk = 0
    let ex_atk = 0
    let magna_stam_atk = 0
    let normal_stam_atk = 0
    let magna_enm_atk = 0
    let normal_enm_atk = 0

    let ta_rate = 0
    let crit = 0

    let bahamut_mod = 0
    let ultima_mod = 0
    let norm_atk_buffs = 0
    let go_aura = 0
    let norm_atk_debuffs = 0
    let ancestral_mod = 0

    const skillCalculate = (skill: Skills, name: string | undefined, skill_level: number) => {
        if (skill.stat === 'atk') {
            if (name?.includes('Bahamut') && bahamut_mod === 0) {
                bahamut_mod += skill.strength
            } else if (skill.type === ('magna')) {
                magna_atk += skill.strength
            } else if (skill.type === ('optimus')) {
    
                if (name?.includes('ancestral')) {
                    ancestral_mod += skill.strength
                } else {
                    normal_atk += skill.strength
                }
                
            } else if (skill.type.includes('EX')) {
                // TODO: Add condition to check for ultima series. Add the mod to ultima mod variable
                ex_atk += skill.strength
            } else if (skill.type.includes('M_Stam')) {
                if (hp >= 25) {
                    if (skill_level <= 15) {
                        magna_stam_atk += ((hp / (skill.strength - skill_level))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        magna_stam_atk += ((hp / (skill.strength - (15 + (0.4 * (skill_level-15)))))**2.9 + 2.1)/100
                    }
                } 
            } else if (skill.type.includes('M_Enm')) {
                magna_enm_atk += skill.strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
            } else if (skill.type.includes('O_Stam')) {
                // TODO: Make one for fediel spine 
                if (hp >= 25) {
                    if (skill_level <= 15) {
                        normal_stam_atk += ((hp / (skill.strength - skill_level))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        normal_stam_atk += ((hp / (skill.strength - (15 + (0.4 * (skill_level-15)))))**2.9 + 2.1)/100
                    }
                } 
            } else if (skill.type.includes('O_Enm')) {
                // TODO: Make one for wilnas fist
                normal_enm_atk += skill.strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
            }
        }
    }

    // Sum up all the grid mods
    for (const wep of weaponList) {
        if (wep) {

            // Skip if no skills
            if (!wep.skills) {
                continue
            }

            // Skill 1
            if (wep.skills[0]) {
                skillCalculate(wep.skills[0], wep.name, wep.skillLevel)
            }
            // Skill 2
            if (wep.skills[1]) {
                skillCalculate(wep.skills[1], wep.name, wep.skillLevel)
                
            }

            // Skill 3
            if (wep.skills[2]) {
                skillCalculate(wep.skills[2], wep.name, wep.skillLevel)
            }
        } 
    }

    // Summon things
    let magna_summon = 1 
    let normal_summon = 1

    const summonCalculate = (summon: Summon) => {
        if (summon.type === 'Magna') {
            magna_summon += summon.strength
        } else if (summon.type === 'Optimus') {
            normal_summon += summon.strength
        }
    }

    if (summonList[0]) {
        summonCalculate(summonList[0])
    }

    if (summonList[1]) {
        summonCalculate(summonList[1])
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
        normal_enm: normal_enm_atk,
        ta: ta_rate,
        crit: crit,
    }
}

/* if (weapon.skill[0]) {
if (wep.name?.includes('Bahamut')) {
                    bahamut_mod += wep.skills[0].strength
                } else if (wep.skills[0].type.includes('Magna')) {
                    magna_atk += wep.skills[0].strength
                } else if (wep.skills[0].type.includes('Optimus')) {
                    if (wep.series?.includes('Ancestral')) {
                        ancestral_mod += wep.skills[0].strength
                    } else {
                        normal_atk += wep.skills[0].strength
                    }
                    
                } else if (wep.skills[0].type.includes('EX')) {
                    // Add condition to check for ultima series. Add the mod to ultima mod variable
                    ex_atk += wep.skills[0].strength
                } else if (wep.skills[0].type.includes('M_Stam')) {
                    if (hp < 25) {
                        continue
                    } else if (wep.skillLevel <= 15) {
                        magna_stam_atk += ((hp / (wep.skills[0].strength - wep.skillLevel))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        magna_stam_atk += ((hp / (wep.skills[0].strength - (15 + (0.4 * (wep.skillLevel-15)))))**2.9 + 2.1)/100
                    }
                } else if (wep.skills[0].type.includes('M_Enm')) {
                    magna_enm_atk += wep.skills[0].strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
                } else if (wep.skills[0].type.includes('O_Stam')) {
                    // TODO: Make one for fediel spine 
                    if (hp < 25) {
                        continue
                    } else if (wep.skillLevel <= 15) {
                        normal_stam_atk += ((hp / (wep.skills[0].strength - wep.skillLevel))**2.9 + 2.1)/100
                    } else { // skill lvl 16 - 20
                        normal_stam_atk += ((hp / (wep.skills[0].strength - (15 + (0.4 * (wep.skillLevel-15)))))**2.9 + 2.1)/100
                    }
                } else if (wep.skills[0].type.includes('O_Enm')) {
                    // TODO: Make one for wilnas fist
                    normal_enm_atk += wep.skills[0].strength * ((1 + 2 * ((100 - hp)/100)) * ((100 - hp)/100))
                }
}
*/
/*if (wep.name?.includes('Bahamut')) {
                    bahamut_mod += wep.skills[1].strength
                } else if (wep.skills[1].type.includes('Magna')) {
                    magna_atk += wep.skills[1].strength
                } else if (wep.skills[1].type.includes('Optimus')) {
                    if (wep.series?.includes('Ancestral')) {
                        ancestral_mod += wep.skills[1].strength
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
                */

                /*if (summonList[0].type.includes('Magna')) {
            magna_summon += summonList[0].strength
        } else if (summonList[0].type.includes('Normal')) {
            normal_summon += summonList[0].strength
        }*/

