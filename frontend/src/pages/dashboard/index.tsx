import React, { useState, useMemo, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/ui/sidebar";
import { InformationCard } from "../../components/ui/card";
import { Clock, CheckCircle } from 'lucide-react';
import { Filterbar } from "../../components/ui/filterbar";
import { useAssignments } from "../../hooks/useAssignments";
import { CardStudentAssignment } from "../../components/ui/card";
import type { Assignment } from "../../types/assignment";

interface SidebarLink {
  path: string;
  label: string;
}

const Dashboard: React.FC = () => {

  const { data: assignments = [], isLoading, error } = useAssignments();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [challengeFilter, setChallengeFilter] = useState<string>("");

  const pendingCount = useMemo(() => 
    assignments.filter(a => a.status === 'pending').length, 
    [assignments]
  );
  
  const gradedCount = useMemo(() => 
    assignments.filter(a => a.status === "graded").length, 
    [assignments]
  );

  const sidebarLinks = useMemo<SidebarLink[]>(() => [
    { path: "/dashboard/assignments", label: "Assignments" },
    { path: "/dashboard/statistics", label: "Statistics" }
  ], []);

  const filteredAssignments = useMemo(() => {
    let filtered = [...assignments];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a => 
        a.name?.toLowerCase().includes(term) ||
        a.assignments_name?.toLowerCase().includes(term)
      );
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(a => a.status === statusFilter);
    }

    if (challengeFilter) {
      filtered = filtered.filter(a => a.assignments_name === challengeFilter);
    }

    return filtered;
  }, [assignments, searchTerm, statusFilter, challengeFilter]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterStatus = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  }, []);

  const handleFilterChallenge = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setChallengeFilter(e.target.value);
  }, []);


  const hasResults = filteredAssignments.length > 0;

  return (
    <div className="flex min-h-screen bg-[#F4F8FD]">
      <Sidebar link={sidebarLinks} />

      <div className="flex-1 flex flex-col">

        <header className="bg-white shadow">
          <div className="heading flex bg-blue-950 h-20 justify-center items-center text-white text-4xl font-medium">
            <h1>Assignment Grading</h1>
          </div>
          <div className="flex justify-center items-center py-4">
            <p className="text-gray-600">Review and grade student submissions</p>
          </div>
        </header>

        <section className="information_card p-6 flex justify-center" aria-label="Assignment Statistics">
          <div className="flex gap-10 px-10 justify-around flex-1">
            <InformationCard 
              className="bg-white w-[400px] h-[120px] shadow-md rounded-2xl p-4 flex justify-between"
              information="Pending Review"
              jumlah={pendingCount}
              logo={<Clock className="w-12 h-12 text-yellow-500" />}
            />
            <InformationCard 
              className="bg-white w-[400px] h-[120px] shadow-md rounded-2xl p-4 flex justify-between"
              information="Graded"
              jumlah={gradedCount}
              logo={<CheckCircle className="w-12 h-12 text-green-500" />}
            />
          </div>
        </section>

        <Filterbar 
          assignments={assignments} 
          onStatusChange={handleFilterStatus} 
          onChallengeChange={handleFilterChallenge} 
          onSearch={handleSearch}
          className="rounded border-2 m-4" 
        />

        {isLoading && (
          <div className="flex justify-center items-center p-8" role="status" aria-live="polite">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600">Loading assignments...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 p-4" role="alert">
            <p className="font-semibold">Failed to load assignments.</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        )}

        <div className="flex-1 p-6">
          <Outlet />
        </div>
        
        {!isLoading && !error && (
          <section className="assignment_information flex justify-center flex-row flex-wrap p-6 gap-4" aria-label="Assignment List">
            {hasResults ? (
              filteredAssignments.map(a => (
                <CardStudentAssignment 
                  key={a.assignments_name} 
                  assignment={a} 
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-8 w-full">
                <p className="text-lg font-medium">No assignments found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;