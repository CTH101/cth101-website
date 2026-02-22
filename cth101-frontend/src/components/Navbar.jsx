import { Link } from "react-router-dom"

export default function Navbar() {

const token = localStorage.getItem("token")

const handleLogout = () => {


localStorage.removeItem("token")

window.location.href = "/"


}

return (


<nav className="bg-black border-b border-zinc-800 px-10 py-4 flex items-center justify-between">

  <h1 className="text-xl font-bold text-white">
    CTH101
  </h1>

  {token && (

    <div className="flex items-center gap-6">

      <Link
        to="/home"
        className="text-gray-400 hover:text-white transition"
      >
        Home
      </Link>

      <Link
        to="/logguard"
        className="text-gray-400 hover:text-white transition"
      >
        LogGuard
      </Link>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>

    </div>

  )}

</nav>


)
}
