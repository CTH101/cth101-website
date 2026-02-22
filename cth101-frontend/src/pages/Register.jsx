import { useState } from "react"

export default function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json()

      if (data.message) {
        alert("Account created successfully")
        window.location.href = "/"
      } else {
        alert("Registration failed")
      }

    } catch (error) {
      alert("Server error")
    }
  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 bg-black border border-zinc-700 rounded text-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 bg-black border border-zinc-700 rounded text-white"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700">
            Register
          </button>

        </form>

      </div>

    </div>
  )
}
