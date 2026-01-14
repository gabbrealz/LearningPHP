import { Link, useNavigate } from "react-router-dom"

export default function Header({ addToNotifs, isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout.php`, {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      addToNotifs({
        bgcolor: "bg-red-700",
        message: data.error
      });
      return;
    }

    addToNotifs({
      bgcolor: "bg-green-700",
      message: data.message
    });
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full py-4 bg-gray-900 px-4 sm:px-12 md:px-20 lg:px-28 xl:px-36">
      <nav className="w-full flex">
        <Link to="/" className="text-xl text-white px-2 py-1 flex items-center rounded-lg hover:text-slate-400 transition-[color]">
          GABBREALZ
        </Link>
        <div className="ml-auto w-1/2 flex justify-end items-center gap-2 lg:gap-4">
          {
            isAuthenticated ?
              <div className="
                text-sm text-black px-2 py-1 border rounded-lg border-white bg-white cursor-pointer transition-colors
                lg:px-4 lg:text-white lg:bg-transparent lg:hover:text-black lg:hover:bg-white
              " onClick={handleLogout}>
                Logout
              </div>
              :
              <>
                <Link to="/login" className="
                  text-sm text-white px-2 py-1 border rounded-lg border-green-700 bg-green-700 transition-colors
                  lg:px-4 lg:border-white lg:bg-transparent lg:hover:border-green-700 lg:hover:bg-green-700
                ">
                  Login
                </Link>
                <Link to="/sign-up" className="
                  text-sm text-white px-2 py-1 border rounded-lg border-indigo-600 bg-indigo-600 transition-colors
                  lg:px-4 lg:border-white lg:bg-transparent lg:hover:border-indigo-600 lg:hover:bg-indigo-600
                ">
                  Sign Up
                </Link>
              </>
          }
        </div>
      </nav>
    </header>
  )
};