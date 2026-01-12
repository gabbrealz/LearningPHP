import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full py-4 bg-black px-4 sm:px-12 md:px-20 lg:px-28 xl:px-36">
      <nav className="w-full flex">
        <Link to="/" className="text-xl text-white px-2 py-1 flex items-center rounded-lg hover:text-slate-400 transition-[color]">
          GABBREALZ
        </Link>
        <div className="ml-auto w-1/2 flex justify-end items-center gap-4">
          <Link to="/login" className="text-sm text-white px-4 py-1 border rounded-lg hover:border-green-700 hover:bg-green-700 transition-colors">
            Login
          </Link>
          <Link to="/sign-up" className="text-sm text-white px-4 py-1 border rounded-lg hover:border-indigo-500 hover:bg-indigo-500 transition-colors">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  )
};