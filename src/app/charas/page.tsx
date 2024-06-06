import Image from 'next/image'

export default function CharactersPage() {
    const imageChoices = ['/lyria_sorry.png', '/zephium.png']
    const choice = Math.floor(Math.random() * imageChoices.length)

    return (
        <div className="flex flex-col justify-center items-center h-[80vh] gap-y-3">
            <Image src={imageChoices[choice]} alt="Sorry picture" width={250} height={250} className='rounded' />
            <p>NOT DONE YET, PLEASE CHECK IT OUT ANOTHER TIME</p>
        </div>
    )
}