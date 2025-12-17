// AssignmentMinMaxChart.tsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Assignment } from "../../../types/assignment";
import { getMinMaxGrade } from "../../../utils/assignments";

export default function AssignmentMinMaxChart({ assignments }: { assignments: Assignment[] }) {
  const { min, max } = getMinMaxGrade(assignments);

  const data = [
    { name: "Lowest Score", value: min },
    { name: "Highest Score", value: max },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} /> {/* FIX scale 0–100 */}
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
