import type React from "react";
import { Search, Filter } from 'lucide-react';
import type { Assignment } from "../../../types/assignment";

type FilterbarProps = {
    assignments?: Assignment[];
    className?: string;
    onSearch?: React.ChangeEventHandler<HTMLInputElement>;
    onChallengeChange?: React.ChangeEventHandler<HTMLSelectElement>;
    onStatusChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const Filterbar: React.FC<FilterbarProps> = ({
    assignments,
    className,
    onSearch,
    onChallengeChange,
    onStatusChange
}) => {
    const uniqueChallenges = [...new Set(assignments?.map(a => a.assignments_name))];
    const uniqueStatuses = [...new Set(assignments?.map(a => a.status))];

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className || ''}`}>
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                        type="text"
                        onChange={onSearch}
                        placeholder="Search by student name, repository..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* Filter by Challenge */}
                <div className="relative min-w-[200px]">
                    <select
                        name="filterByChallenge"
                        id="fbc"
                        onChange={onChallengeChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
                    >
                        <option value="">All Challenges</option>
                        {uniqueChallenges.map((challenge) => (
                            <option key={challenge} value={challenge}>
                                {challenge}
                            </option>
                        ))}
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Filter by Status */}
                <div className="relative min-w-[200px]">
                    <select
                        name="filterByStatus"
                        id="filterByStatus"
                        onChange={onStatusChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
                    >
                        <option value="all">All Status</option>
                        {uniqueStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default Filterbar;