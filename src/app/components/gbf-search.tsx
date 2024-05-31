interface SearchProps {
    placeholderText?: string
    onClick?: () => void
}

function Search ({onClick, placeholderText}: SearchProps) {
    return (
        <>
            <label className="text-black italic">Search the site</label>
            <div className="flex gap-4 text-black">
                <input type='search' placeholder={placeholderText} className="grow"/>
                <button onClick={onClick}>Search</button>
            </div>
        </>
    )
}
export function DefaultSearch({onClick, placeholderText}: SearchProps) {
    return (
        <>
            <label className="text-black italic">Search the site</label>
            <div className="flex text-black">
                <input type='search' placeholder={placeholderText} />
                <button onClick={onClick} >Search</button>
            </div>
        </>
        
    )
}

export function GBFWeaponSearch({onClick}: SearchProps) {
    return (
        <Search placeholderText='Search weapons...' />
    )
}