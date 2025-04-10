import React, { Children } from "react";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Outlet />

      <a
        href="/dashboard/addjob"
        className="text-blue-500 hover:underline ml-2"
      >
        Go to Add Job
      </a>

      <a
        href="/dashboard/viewjobs"
        className="text-blue-500 hover:underline ml-2"
      >
        View All Jobs
      </a>
    </div>
  );
}

export default Dashboard;
