import { useState } from "react"

export default function LogGuard() {

const [logType, setLogType] = useState("")
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
alert("Login expired. Please login again.")
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

if (!response.ok) {
alert(data.error || "Analysis failed")
setLoading(false)
return
}

setResult(data)

} catch (error) {

console.error(error)
alert("Server connection error")

}

setLoading(false)

}

return (

<div className="min-h-screen bg-black flex items-center justify-center p-6">

<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 w-full max-w-3xl">

<h1 className="text-3xl font-bold mb-4 text-center">
LogGuard
</h1>

<p className="text-gray-400 text-center mb-6">
Security Log Analyzer
</p>

<select
className="w-full mb-4 px-4 py-3 bg-black border border-zinc-700 rounded-md text-white"
value={logType}
onChange={(e)=>setLogType(e.target.value)}
>
<option value="">Select Log Type</option>
<option value="firewall">Firewall</option>
<option value="ssh">SSH</option>
<option value="web">Web</option>
<option value="system">System</option>
<option value="ids">IDS</option>
</select>

<input
type="file"
className="w-full mb-6 text-white"
onChange={(e)=>setSelectedFile(e.target.files[0])}
/>

<button
onClick={handleAnalyze}
className="w-full bg-blue-600 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
>
{loading ? "Analyzing..." : "Analyze Log"}
</button>

{result && (

<div className="mt-8 bg-black border border-zinc-700 rounded-md p-4">

<h2 className="text-xl font-semibold mb-3">Analysis Result</h2>

<pre className="text-green-400 text-sm overflow-x-auto">
{JSON.stringify(result, null, 2)}
</pre>

</div>

)}

</div>

</div>

)

}
