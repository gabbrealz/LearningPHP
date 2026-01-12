import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full px-36 py-4 bg-slate-300">
      <nav className="w-full">
        <Link className="text-lg">
          gabbrealz
        </Link>
        <div className="ml-auto w-1/2">
          
        </div>
      </nav>
    </header>
  )
};