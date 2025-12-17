import type { Assignment } from '../../../types/assignment';
import { sortAssignmentsByDate } from '../../../utils/assignments';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useMemo } from 'react';

const AssignmentChart = ({ assignments }: { assignments: Assignment[] }) => {

  const sorted = useMemo(
    () => sortAssignmentsByDate(assignments, "asc"),
    [assignments]
  );

  const chartData = useMemo(
    () =>
      sorted.map(a => ({
        date: new Date(a.submitted_at).toLocaleDateString('id-ID'),
        nilai: a.nilai
      })),
    [sorted]
  );

  return (
    <div className="w-full h-64 bg-white rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Perkembangan Nilai Student</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="nilai" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssignmentChart;
