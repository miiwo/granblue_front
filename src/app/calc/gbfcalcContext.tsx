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
    strength: {[key: string]: number}
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
    mcElement: MutableRefObject<string> | undefined,
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
    mcElement: undefined,
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
    const mcElement = useRef<string>('Fire')

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
            const _dmgMods = calculateGridMods(Object.keys(_grid).map<Weapon>(key => _grid[key]), 
                                                Object.keys(_sumGrid).map<Summon>(key => _sumGrid[key]), 
                                                hp.current)
            //console.log(_dmgMods)
            console.log(_grid)
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
        let _sumGrid:any
        let _grid: any
        if (keyname.current) {
            _sumGrid = {...summonGrid, [keyname.current]: summon}
            setSummonGrid(_sumGrid)

            _grid = grid
            const _dmgMods = calculateGridMods(Object.keys(_grid).map<Weapon>(key => _grid[key]), 
                                                Object.keys(_sumGrid).map<Summon>(key => _sumGrid[key]), 
                                                hp.current)
            console.log(_dmgMods)
            console.log(_sumGrid)
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

    return (
        <GBFWeaponGridContext.Provider value={{
            grid,
            summonGrid,
            dmgFormulaMods,
            utilityMods,
            keyname,
            hp,
            mcElement,
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

    // Summon things
    let magna_summon = 1 
    let normal_summon = 1

    const summonCalculate = (summon: Summon) => {
        if (summon.type === 'Magna') {
            magna_summon += summon.strength/100
        } else if (summon.type === 'Optimus') {
            normal_summon += summon.strength/100
        }
    }
    // Summon strength must be of 100, 120, 150, etc. Not 1.5 or 1.2
    if (summonList[0]) {
        summonCalculate(summonList[0])
    }

    if (summonList[1]) {
        summonCalculate(summonList[1])
    }

    const skillCalculate = (skill: Skills, name: string | undefined, skill_level: number) => {
        if (skill.stat.includes('atk')) {
            switch (skill.type) {
                case 'magna':
                    magna_atk += skill.strength['atk']/100
                    break
                case 'normal':
                    if (name?.includes('Bahamut')) {
                        bahamut_mod += bahamut_mod == 0 ? skill.strength['atk']/100 : 0
                    } else {
                        if (name?.includes('Ancestral')) {
                            // TODO: Add to it later
                            // ancestral_mod += skill.strength['atk']/100
                        } else {
                            normal_atk += skill.strength['atk']/100
                        }
                    }
                    break
                case 'ex':
                    if (name?.includes('Ultima')) {
                        // TODO DO THIS PROPERLY
                        // ultima_mod = 0
                    } else {
                        ex_atk += skill.strength['atk']/100
                    }
                    break
                default:
                    break
            }
        } 

        if (skill.stat.includes('crit')) {
            switch (skill.type) {
                case 'magna':
                    crit += skill.strength['crit']/100*magna_summon
                    break
                case 'optimus':
                    crit += skill.strength['crit']/100*normal_summon
                    break
                default:
                    break
            }

        }


        if (skill.stat.includes('ta')) {
            switch (skill.type) {
                case 'magna':
                    ta_rate += skill.strength['ta']/100*magna_summon
                    break
                case 'optimus':
                    ta_rate += skill.strength['ta']/100*normal_summon
                default:
                    break
            }
        }

        if (skill.stat.includes('stam')) {
            switch (skill.type) {
                case 'magna':
                    if (hp >= 25) {
                        if (skill_level <= 15) {
                            console.log(hp)
                            magna_stam_atk += (hp / (skill.strength['stam'] - skill_level))**2.9 + 2.1
                        } else { // skill lvl 16 - 20
                            magna_stam_atk += (hp / (skill.strength['stam'] - (15 + (0.4 * (skill_level-15)))))**2.9 + 2.1
                        }
                    }
                    break
                case 'normal':
                    if (hp >= 25) {
                        if (name?.includes('Fediel Spine')) {
                            // TODO: Implement this later
                        } else {
                            if (skill_level <= 15) {
                                normal_stam_atk += (hp / (skill.strength['stam'] - skill_level))**2.9 + 2.1
                            } else { // skill lvl 16 - 20
                                normal_stam_atk += (hp / (skill.strength['stam'] - (15 + (0.4 * (skill_level-15)))))**2.9 + 2.1
                            }
                        }
                    }
                    break
                default:
                    break
            }
        }

        if (skill.stat.includes('enmity')) {
            switch (skill.type) {
                case 'magna':
                    magna_enm_atk += skill.strength['enmity'] * ((1+2*((100-hp)/100)) * ((100 - hp)/100))
                    break
                case 'normal':
                    if (name?.includes('Wilnas Fist')) {
                        // TODO: Implement this later
                    } else {
                        normal_enm_atk += skill.strength['enmity'] * ((1+2*((100-hp)/100)) * ((100 - hp)/100))
                    }
                    break
                default:
                    break
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
        total: roundTo((((1 + magna_atk) * (1 + normal_atk) * (1 + ex_atk) * (1 + normal_stam_atk) * (1 + normal_enm_atk) * (1 + magna_stam_atk) * (1 + magna_enm_atk))-1)*100, 2),
        magna: roundTo(magna_atk*100, 2),
        normal: roundTo(normal_atk*100, 2),
        ex: roundTo(ex_atk*100, 2),
        magna_stam: roundTo(magna_stam_atk, 2),
        normal_stam: roundTo(normal_stam_atk, 2),
        magna_enm: roundTo(magna_enm_atk, 2),
        normal_enm: roundTo(normal_enm_atk, 2),
        ta: roundTo(ta_rate*100, 2),
        crit: roundTo(crit*100, 2),
    }
}

const roundTo = function(num: number, places: number) {
    const factor = 10 ** places
    return Math.round(num * factor) / factor
}

