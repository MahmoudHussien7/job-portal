import { fetchRecruiterJobs, deletejob } from "../app/Slices/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { jobs } = useSelector((state) => state.jobs);

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Posted Jobs</h2>
        <Link to="/recruiter/addjob" className="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
          <p className="text-base-content/70 mb-4">
            Start by creating your first job listing
          </p>
          <Link to="/recruiter/addjob" className="btn btn-primary">
            Post a Job
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm opacity-70">
                      {job.company || "Your Company"}
                    </div>
                  </td>
                  <td>{job.location || "Remote"}</td>
                  <td>
                    <div className="badge badge-outline">
                      {job.category || "General"}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`badge ${
                        job.status === "active"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {job.status || "Active"}
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="btn btn-circle btn-ghost btn-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                    <Link
                      to={`/recruiter/editjob/${job.id}`}
                      className="btn btn-circle btn-ghost btn-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="btn btn-circle btn-ghost btn-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default MyJobs;
