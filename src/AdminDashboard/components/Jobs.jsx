import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/jobs/jobSlice";
import { Link } from "react-router-dom";
import JobCard from "../../Components/JobCard";

const Jobs = () => {
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    try{

    
      dispatch(fetchJobs()); // Only dispatch if jobs are not already loaded and not currently loading
    }
    catch(error){
      console.log("Error fetching jobs:", error);
    }
  }, [dispatch, jobs.length, loading]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id}>
            <Link to={`/jobs/${job.id}`}>
              <JobCard job={job} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
