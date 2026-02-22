import { useState } from "react"

export default function Login() {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)

const handleLogin = async (e) => {
e.preventDefault()


if (!email || !password) {
  alert("Please enter email and password")
  return
}

try {

  setLoading(true)

  const response = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })

  const data = await response.json()

  if (data.access_token) {

    localStorage.setItem("token", data.access_token)

    window.location.href = "/home"

  } else {

    alert("Invalid credentials")

  }

  setLoading(false)

} catch (error) {

  console.error(error)
  alert("Server connection error")
  setLoading(false)

}


}

return (


<div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

  {/* Background glow */}

  <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px] top-[-100px] left-[-100px]"></div>
  <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] bottom-[-100px] right-[-100px]"></div>


  {/* Login Card */}

  <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-10 w-full max-w-md backdrop-blur-lg">

    <h1 className="text-4xl font-bold text-center mb-2">
      CTH101
    </h1>

    <p className="text-gray-400 text-center mb-8">
      Cybersecurity Intelligence Platform
    </p>


    <form onSubmit={handleLogin}>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-3 bg-black border border-zinc-700 rounded-md text-white focus:outline-none focus:border-blue-500"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 px-4 py-3 bg-black border border-zinc-700 rounded-md text-white focus:outline-none focus:border-blue-500"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="text-gray-400 text-sm mt-4 text-center">
  Don't have an account? 
  <a href="/register" className="text-blue-500 ml-1">Register</a>
</p>


    </form>


    <p className="text-gray-500 text-center mt-6 text-sm">
      Powered by CTH101 Security Labs
    </p>

  </div>

</div>


)
}
