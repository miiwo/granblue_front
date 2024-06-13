import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'

const navItems = {
  '/': {
    name: 'home',
  },
  '/calc': {
    name: 'calculator',
  },
  '/weapons': {
    name: 'weapons',
  },
  '/charas': {
    name: 'characters',
  },
  'https://gbf.wiki/Main_Page': {
    name: 'gbf.wiki',
  },
}

const navDirectionLeft = 'pl-3'
const navDirectionRight = 'justify-end'
let isDarkMode = true
/*
<button onClick={() => { isDarkMode = !isDarkMode }}>
            {isDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
          </button>
          
        
export function ThemeToggle
const [darkMode, setDarkMode] = useState(true)

useEffect(() => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") setDarkMode(true);
}, [])
})

useEffect(() => {
if (darkMode) {
  document.documentElement.classList.add("dark"); localStorage.setItem("theme", "dark");
} else {
  document.documentElement.classList.remove("dark"); localStorage.setItem("theme", "light");
}, [darkMode])

return <div>onClick={() => setDarkMode(!darkMode)}</div>
*/

const navDirection = navDirectionRight

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20 bg-nordzero pb-4">
        <nav
          className={`flex flex-col md:flex-row items-center md:items-end relative ${navDirection} px-0 pb-0 pt-3 fade md:overflow-auto scroll-pr-6 md:relative`}
          id="nav"
        >
          <h1 className='flex-grow text-2xl pl-5 py-1 pr-2 m-1'>Skyfaring Domain</h1>
          
          <div className="flex flex-row space-x-0 md:pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-200 dark:hover:text-nordblue flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}