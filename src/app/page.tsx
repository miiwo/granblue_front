export default function Home() {
  const latestUpdates: any = {
    '2024-06-12': 'Launched the website!',
  }

  return (
    <div className="h-screen grid grid-rows-3 justify-center">
      <div className="row-span-1 text-center mx-4 md:mx-12 pt-14 md:pt-6">
        <p>Hello and welcome! This is a website to calculate the mods in a grid, even if you don&apos;t have the weapon! It also holds a database of characters + weapon info as supplementary to the calculator.</p>
      </div>
      
      <div className="flex flex-col place-items-center row-span-2 lg:w-96">
        <h1 className="mb-10 lg:mb-20 text-2xl">Latest Updates</h1>
        <div className="flex flex-col mx-3 md:flex-row gap-4 justify-center">
          {Object.keys(latestUpdates).map((key, i) => {
            return (
              <span key={`latest_update_${i}`} className="border px-4 py-3 basis-1/3">
                <h2>{key}</h2>
                <p>{latestUpdates[key]}</p>
              </span>
          )})}
        </div>
      </div>
    </div>
  );
}
