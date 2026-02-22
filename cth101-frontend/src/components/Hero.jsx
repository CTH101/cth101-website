export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center px-20">

      <div className="max-w-4xl">

        <h1 className="text-6xl font-bold leading-tight mb-6">
          Enterprise-Grade Cybersecurity Intelligence
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-2xl">
          CTH101 builds advanced cybersecurity platforms that transform raw
          security data into actionable intelligence for modern infrastructure.
        </p>

        <div className="flex gap-6">
          <button className="bg-blue-600 px-8 py-3 rounded-md hover:bg-blue-700">
            Explore LogGuard AI
          </button>

          <button className="border border-zinc-700 px-8 py-3 rounded-md hover:border-white">
            Learn More
          </button>
        </div>

      </div>

    </section>
  )
}
