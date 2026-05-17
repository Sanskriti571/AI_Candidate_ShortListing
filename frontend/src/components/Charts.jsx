import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ data }) => {

  return (

    <div className="bg-slate-800 p-6 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold text-white mb-6">
        Match Analytics
      </h2>

      <div style={{ width: "100%", height: 400 }}>

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="finalScore"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Charts;