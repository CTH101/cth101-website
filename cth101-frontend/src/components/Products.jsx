import { Link } from "react-router-dom"

export default function Products() {
  return (
    <section className="bg-black text-white px-20 py-32">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-4">
          Security Platforms
        </h2>

        <p className="text-gray-400 mb-16 max-w-2xl">
          CTH101 develops enterprise-grade cybersecurity platforms designed
          to transform raw infrastructure data into actionable security
          intelligence.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LogGuard AI */}
          <Link to="/logguard">
            <div className="bg-zinc-900 p-10 rounded-xl border border-zinc-800 hover:border-blue-500 hover:bg-zinc-800 transition cursor-pointer h-full">

              <h3 className="text-2xl font-semibold mb-4">
                LogGuard AI
              </h3>

              <p className="text-gray-400 mb-6">
                AI-powered log intelligence platform that detects anomalies,
                identifies suspicious behavior, and converts raw logs into
                actionable security insights.
              </p>

              <span className="text-blue-500 text-sm font-medium">
                Learn more →
              </span>

            </div>
          </Link>

          {/* Research Lab */}
          <div className="bg-zinc-900 p-10 rounded-xl border border-zinc-800 hover:border-blue-500 hover:bg-zinc-800 transition">

            <h3 className="text-2xl font-semibold mb-4">
              Threat Research Lab
            </h3>

            <p className="text-gray-400 mb-6">
              Research division focused on anomaly detection models,
              threat intelligence systems, and machine learning
              experimentation for next-generation cyber defense.
            </p>

            <span className="text-gray-500 text-sm">
              Coming Soon
            </span>

          </div>

        </div>

      </div>

    </section>
  )
}
