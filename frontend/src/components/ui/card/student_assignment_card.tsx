import React from "react";
import { useNavigate } from "react-router-dom";
import type { Assignment } from "../../../types/assignment";
import { GitCommit, Clock } from "lucide-react";

type CardStudentAssignmentProps = {
  assignment: Assignment;
};

const CardStudentAssignment: React.FC<CardStudentAssignmentProps> = ({ assignment }) => {
  const navigate = useNavigate();

  const handleGrade = () => {
    navigate(`/dashboard/${assignment.repository_name}`, {
      state: { assignment }
    });
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 w-full max-w-[450px] m-2">
      {/* TOP ROW */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="bg-purple-500 w-14 h-14 rounded-xl text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
          {assignment.name.slice(0, 2).toUpperCase()}
        </div>

        {/* Student Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-semibold text-gray-800">
              {assignment.name}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                assignment.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {assignment.status === "pending" ? "Pending" : "Graded"}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">{assignment.assignments_name}</p>

          <div className="flex items-center gap-6 mt-3 text-sm text-gray-500 flex-wrap">
            <div className="flex items-center gap-1.5">
              <GitCommit size={16} />
              <span>{assignment.commit} commits</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>Last commit: {assignment.submitted_at.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-6">
        <a 
          href={assignment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          View Repository
        </a>

        <button
          onClick={handleGrade}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          Grade Assignment
        </button>
      </div>
    </div>
  );
};

export default CardStudentAssignment;
