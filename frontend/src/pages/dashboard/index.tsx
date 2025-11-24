import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getSession } from "../../services/session";
import type { User } from "../../types/user";
import type { Assignment } from "../../types/assignment";
import { GetAssignments } from "../../services/assignments";
import { Sidebar } from "../../components/ui/sidebar";
const Dashboard = () => {
  const user = getSession("user") as User;
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const res = await GetAssignments();

        if (res.Status !== 200) {
          console.error("Failed to fetch assignments");
          return;
        }

        const mapped = res.Data.map((item) => ({
          ...item,
          submitted_at: new Date(item.submitted_at),
        }));

        setAssignments(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar link={[{path:"github.com",label:"github"},{path:"github.com",label:"facebook"}]}/>

      {/* Main content */}
      <div className="main flex flex-row flex-1 bg-amber-300">
        <div className="header flex-1">
          <div className="heading flex  bg-blue-950 h-20 flex-1 justify-center items-center text-white text-4xl font-medium">
              <h1>Assignment Grading</h1>
          </div>
          <p className="flex flex-1 justify-center items-center">review and graded student submission</p>
        </div>
      </div>


      {/* information card */}
      
    </div>
  );
};

export default Dashboard;
