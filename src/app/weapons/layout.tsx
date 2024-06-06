import { GBFWeaponSearch } from "../components/calc/gbf-search"

export default function WeaponsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <h1 className="font-bold text-2xl underline underline-offset-4 mb-3">Weapons</h1>
            <div className="bg-nordtwo rounded mx-3 mb-3 py-5 px-3">
                <GBFWeaponSearch />
            </div>
            {children}
        </>

    )
}