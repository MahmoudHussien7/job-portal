import { fetchRecruiterJobs, deletejob } from "../app/Slices/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (userData?.userId) {
      dispatch(fetchRecruiterJobs(userData.userId));
    }
  }, [userData, dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      dispatch(deletejob(id));
    }
  };

  return (
    <div className="mx-10 mt-10">
      <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>
      {loading.fetch ? (
        <p>Loading...</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p>{job.company}</p>
            <button
              onClick={() => handleDelete(job.id)}
              className="text-red-500"
            >
              Delete
            </button>
            <Link
              to={`/recruiter/editjob/${job.id}`}
              className="text-blue-500 hover:underline"
            >
              Edit
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
export default MyJobs;
