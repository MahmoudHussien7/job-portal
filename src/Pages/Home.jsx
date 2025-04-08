import React from "react";
import Hero from "../Components/Hero";
import TrustedCompanies from "../Components/TrustedCompanies";
import SidebarFilter from "../Components/SiderBar";
import JobList from "../Components/JobList";
import Pagination from "../Components/Pagination";

const HomePage = () => {
  return (
    <div className="bg-gray-50  ">
      <Hero />
      <TrustedCompanies />
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="col-span-1">
          <SidebarFilter />
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-4">Latest Jobs</h2>
          <JobList />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
