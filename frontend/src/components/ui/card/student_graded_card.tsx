import type React from "react";
import type { Assignment } from "../../../types/assignment";
import { GitBranch, ExternalLink } from "lucide-react";

type StudentGradedCardProps = {
  assignment: Assignment;
};

const StudentGradedCard: React.FC<StudentGradedCardProps> = ({ assignment }) => {
  return (
    <div className=" m-3 bg-white rounded-2xl shadow-md p-8 h-[300px] w-[700px] text-black">
      <div className="header mb-6">
        <h1 className="text-4xl font-bold flex justify-between items-start">
          {assignment.assignments_name}
          <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
            assignment.status === 'graded' 
              ? 'bg-green-400 text-green-900' 
              : 'bg-yellow-400 text-yellow-900'
          }`}>
            {assignment.status}
          </span>
        </h1>
      </div>

      <div className="content flex justify-between gap-6">
        <div className="left space-y-3 flex-1">
          <p className="text-lg"><span className="font-semibold">Student:</span> {assignment.name}</p>
          <p className="text-lg flex items-center gap-2">
            <GitBranch size={18} />
            <span className="font-semibold">Repository:</span> {assignment.repository_name}
          </p>
          <p className="text-lg"><span className="font-semibold">Last Submitted:</span> {new Date(assignment.submitted_at).toLocaleString()}</p>
        </div>

        <div className="right flex flex-col items-end justify-between">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 text-center border-2 border-white/30">
            <p className="text-sm font-medium mb-1 opacity-90">Score</p>
            <p className="text-5xl font-bold">{assignment.nilai}</p>
          </div>
          <a 
            href={assignment.url}
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            <ExternalLink size={18} />
            View Repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentGradedCard;
