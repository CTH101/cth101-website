import { useState } from "react"

export default function LogGuard() {

  const [logType, setLogType] = useState("ssh")
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {

    if (!selectedFile) {
      alert("Please select a log file")
      return
    }

    const token = localStorage.getItem("token")

    if (!token) {
      alert("You are not logged in")
      window.location.href = "/"
      return
    }

    const formData = new FormData()
    formData.append("log_type", logType)
    formData.append("file", selectedFile)

    try {

      setLoading(true)

      const response = await fetch(
        "https://cth101-website-production.up.railway.app/analyze",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      )

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        alert("Analysis failed")
      }

      setLoading(false)

    } catch (error) {

      console.error(error)
      alert("Server error")
      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-xl w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-4 text-center">
          LogGuard
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Security Log Analyzer
        </p>

        <select
          className="w-full mb-4 p-3 bg-black border border-zinc-700 text-white"
          value={logType}
          onChange={(e) => setLogType(e.target.value)}
        >
          <option value="ssh">SSH</option>
          <option value="web">Web</option>
          <option value="firewall">Firewall</option>
          <option value="system">System</option>
        </select>

        <input
          type="file"
          className="mb-4 text-white"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 py-3 rounded-md"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="mt-6 bg-black p-4 rounded border border-zinc-700">
            <pre className="text-green-400 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

      </div>

    </div>

  )
}
