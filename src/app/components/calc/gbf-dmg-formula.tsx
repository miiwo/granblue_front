'use client'
import {useEffect, useRef, useState} from 'react'

interface NumberAnimatorProps {
    initialValue: number
    targetValue: number
}

export function NumberAnimator({initialValue, targetValue}: NumberAnimatorProps) {
    const [count, setCount] = useState(initialValue)
    const duration = 4

    //useEffect(() => {
    //    let star

        
    //}, [targetValue, initialValue])

    return (
        <div>{count}%</div>
    )
}