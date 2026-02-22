import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

export default function AttackTimeline({ alerts }) {

  const data = alerts.map((alert, index) => ({
    time: index + 1,
    events: 1
  }))

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mt-12">

      <h2 className="text-2xl font-bold mb-6">
        Attack Timeline
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#333" />

          <XAxis dataKey="time" stroke="#aaa" />

          <YAxis stroke="#aaa" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="events"
            stroke="#3b82f6"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )
}
