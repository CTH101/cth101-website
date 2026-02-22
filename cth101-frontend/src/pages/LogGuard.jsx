import { useState } from "react"
import AttackTimeline from "../components/AttackTimeline"


export default function LogGuard() {

  const [logType, setLogType] = useState("ssh")
  const [selectedFile, setSelectedFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {

    if (!selectedFile) {
      alert("Please select a log file")
      return
    }

    const formData = new FormData()
    formData.append("log_type", logType)
    formData.append("file", selectedFile)

    try {

      setLoading(true)

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      setResult(data)
      setLoading(false)

    } catch (error) {
      console.error(error)
      alert("Error connecting to backend")
      setLoading(false)
    }
  }

  return (

    <section className="bg-black text-white min-h-screen px-20 py-28">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-6">
          LogGuard AI
        </h1>

        <p className="text-gray-400 mb-12 max-w-2xl">
          Analyze infrastructure logs using specialized detection modules
          designed for SSH, firewall, IDS, malware, web and system logs.
        </p>


        {/* Upload Panel */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 mb-16">

          <label className="block text-sm text-gray-400 mb-3">
            Select Log Type
          </label>

          <select
            value={logType}
            onChange={(e) => setLogType(e.target.value)}
            className="bg-black border border-zinc-700 px-4 py-2 rounded-md w-full mb-8"
          >
            <option value="ssh">SSH Logs</option>
            <option value="web">Web Server Logs</option>
            <option value="firewall">Firewall Logs</option>
            <option value="ids">IDS Alerts</option>
            <option value="system">System Logs</option>
            <option value="malware">Malware Indicators</option>
          </select>


          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="mb-6 text-sm text-gray-300"
          />


          <button
            onClick={handleAnalyze}
            className="bg-blue-600 px-8 py-3 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Analyze Logs"}
          </button>

        </div>


        {/* Results Section */}

        {result && result.results && (() => {

          const totalAlerts = Object.values(result.results)
            .reduce((sum, alerts) => sum + alerts.length, 0)

          let threatLevel = "LOW"
          let color = "text-green-500"

          if (totalAlerts > 5) {
            threatLevel = "HIGH"
            color = "text-red-500"
          } else if (totalAlerts > 0) {
            threatLevel = "MEDIUM"
            color = "text-yellow-400"
          }

          return (

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10">

              <h2 className="text-3xl font-bold mb-10">
                Security Alert Summary
              </h2>


              {/* Threat Level */}

              <div className="mb-10">

                <h3 className="text-xl text-gray-400 mb-2">
                  Threat Level
                </h3>

                <p className={`text-4xl font-bold ${color}`}>
                  {threatLevel}
                </p>

              </div>


              {/* Alert Counters */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {Object.entries(result.results).map(([key, value]) => (

                  <div
                    key={key}
                    className="bg-black border border-zinc-700 rounded-lg p-6 text-center hover:border-blue-500 transition"
                  >

                    <h3 className="text-lg font-semibold mb-3 capitalize text-gray-300">
                      {key} Alerts
                    </h3>

                    <p
                      className={`text-4xl font-bold ${
                        value.length > 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {value.length}
                    </p>

                  </div>

                ))}

              </div>


              {/* Alert Details */}

              <div className="mt-12">

                <h2 className="text-2xl font-bold mb-6">
                  Alert Details
                </h2>

                {Object.entries(result.results).map(([key, alerts]) => (

                  alerts.length > 0 && (

                    <div key={key} className="mb-6">

                      <h3 className="text-lg font-semibold mb-3 capitalize">
                        {key} Alerts
                      </h3>

                      <pre className="bg-black p-4 rounded border border-zinc-700 text-green-400 text-sm overflow-x-auto">
                        {JSON.stringify(alerts, null, 2)}
                      </pre>

                    </div>

                  )

                ))}

              </div>


              {/* Suspicious Activity Table */}

              <div className="mt-12">

                <h2 className="text-2xl font-bold mb-6">
                  Suspicious Activity
                </h2>

                <table className="w-full border border-zinc-700 text-left">

                  <thead className="bg-zinc-900">
                    <tr>
                      <th className="p-3">Source</th>
                      <th className="p-3">Event</th>
                    </tr>
                  </thead>

                  <tbody>

                    {Object.values(result.results).flat().map((alert, index) => (

                      <tr key={index} className="border-t border-zinc-800">

                        <td className="p-3">
                          {alert.src_ip || "unknown"}
                        </td>

                        <td className="p-3">
                          {alert.message || "suspicious activity"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
              <AttackTimeline alerts={Object.values(result.results).flat()} />


            </div>

          )

        })()}

      </div>

    </section>

  )
}
