import type React from "react";
import { Sidebar } from "../../components/ui/sidebar";
import { Award } from "lucide-react";
import { useAssignmentsByName } from "../../hooks/useAssignments";
import { CardStudentAssignment } from "../../components/ui/card";
import { AssignmentChart,AssignmentPieChart,AssignmentMinMaxChart } from "../../components/ui/charts";
import { Filterbar } from "../../components/ui/filterbar";
import { useState, useMemo } from "react";
import { calculateAverageGrade } from "../../utils/assignments";

const Home: React.FC = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    console.log(sessionUser)
    const name = sessionUser.Name ?? "";

    const {
        data: assignments = [],
        isLoading,
        isError,
        error
    } = useAssignmentsByName(name);

    const [search, setSearch] = useState("");
    const [challengeFilter, setChallengeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const average = calculateAverageGrade(assignments);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase());
    };

    const handleChallengeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChallengeFilter(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
    };

    const filteredAssignments = useMemo(() => {
        return assignments.filter((a) => {
            const matchSearch =
                a.name.toLowerCase().includes(search) ||
                a.repository_name.toLowerCase().includes(search);

            const matchChallenge =
                challengeFilter === "" || a.assignments_name === challengeFilter;

            const matchStatus =
                statusFilter === "all" || a.status === statusFilter;

            return matchSearch && matchChallenge && matchStatus;
        });
    }, [assignments, search, challengeFilter, statusFilter]);

    return (
        <div className="main-layout flex">
            <Sidebar link={[]} />
            
            <main className="main-content flex-1 flex flex-col bg-[#F7FAFD]">
                {/* Header Section */}
                <header className="page-header p-6">
                    <div className="header-container bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="header-content flex items-center justify-between">
                            <div className="welcome-section">
                                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                    Selamat Datang Kembali 👋
                                </h1>
                                <p className="text-slate-600 text-base">
                                    {new Date().toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </p>
                            </div>

                            <div className="stats-section flex items-center gap-6">
                                <div className="gpa-card bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-lg min-w-[200px]">
                                    <div className="card-header flex items-center justify-between mb-2">
                                        <span className="card-label text-blue-100 text-sm font-medium">
                                            Rata-rata Nilai
                                        </span>
                                        <div className="icon-wrapper bg-white/20 p-2 rounded-lg">
                                            <Award className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="card-value flex items-end gap-2">
                                        <span className="current-gpa text-4xl font-bold text-white">
                                            {average}
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
               
                {/* Content Section */}
                <section className="content-section flex flex-1 gap-3 px-6 pb-6">
                    <div className="assignment-container bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Tugas</h2>

                        {/* NEW — Filterbar */}
                        <Filterbar
                            assignments={assignments}
                            onSearch={handleSearch}
                            onChallengeChange={handleChallengeChange}
                            onStatusChange={handleStatusChange}
                            className="mb-4"
                        />

                        {/* NEW — Render card berdasarkan filteredAssignments */}
                        {filteredAssignments.length === 0 && (
                            <p className="text-slate-500">Tidak ada data</p>
                        )}

                        <div className="flex flex-col gap-3">
                            {filteredAssignments.map((a) => (
                                <CardStudentAssignment key={a.assignments_name} assignment={a} />
                            ))}
                        </div>
                    </div>
                    
                    <div className="statistics-container bg-white rounded-xl shadow-sm border border-slate-200 p-6 w-[400px]">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Statistik</h2>

                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error loading data</p>}

                        {!isLoading && !error && (
                            <>
                                <AssignmentChart assignments={assignments} />
                                <div className="piechart mt-6">
                                    <AssignmentPieChart assignments={assignments} />
                                </div>
                                <div className="min-max-chart mt-6">
                                    <AssignmentMinMaxChart assignments={assignments}/>
                                </div>
                            </>
                        )}

                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
