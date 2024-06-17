import { Search, SearchProps } from "../base/base-components";

export function GBFWeaponSearch({onClick}: SearchProps) {
    
    return (
        <Search onClick={onClick} placeholderText='Search weapons...' />
    )
}