import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Assignment } from "../../../types/assignment";
import { distributionAssignment } from "../../../utils/assignments";

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"]; // A,B,C,D

export default function AssignmentPieChart({ assignments }: { assignments: Assignment[] }) {
  const dist = distributionAssignment(assignments);

  const data = [
    { name: "Grade A", value: dist.A },
    { name: "Grade B", value: dist.B },
    { name: "Grade C", value: dist.C },
    { name: "Grade D", value: dist.D },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
