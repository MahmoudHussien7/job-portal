import React from "react";
import { Outlet } from "react-router-dom";

const RecruiterDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <Outlet />
      <p className="mt-4">Manage your job postings and applicants here.</p>
      <a
        href="/recruiter/addjob"
        className="bg-green-600 text-white py-2 rounded mt-4"
      >
        Add New Job
      </a>
      <a
        href="/recruiter/myjobs"
        className="bg-red-600 text-white py-2 rounded mt-4 ml-2"
      >
        View Applicants
      </a>
    </div>
  );
};

export default RecruiterDashboard;
