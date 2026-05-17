import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ data }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl mt-6">
      <h2 className="text-2xl font-semibold mb-5">
        Match Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="finalScore" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;