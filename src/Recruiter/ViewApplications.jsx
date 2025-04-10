// src/pages/ViewApplications.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchApplications,
  updateApplicationStatus,
} from "../app/slices/applicationSlice";

const ViewApplications = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { applications, loading } = useSelector((state) => state.applications);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (userData?.userId) {
      dispatch(fetchApplications(userData.userId));
    }
  }, [userData, dispatch]);

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(updateApplicationStatus({ applicationId, status: newStatus }));
  };

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((app) => app.status === statusFilter);

  if (loading) {
    return <div className="text-center py-12">Loading applications...</div>;
  }

  return (
    <div className="mx-10 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Applications Received</h2>
        <div>
          <label className="mr-2">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="screening">Screening</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium mb-2">
            {statusFilter === "all"
              ? "No applications received yet"
              : `No applications with status "${statusFilter}"`}
          </h3>
          <p className="text-base-content/70 mb-4">
            Applications for your posted jobs will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Applied Role</th>
                <th>Cover Letter</th>
                <th>CV</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="font-medium">{app.applicant.fullName}</div>
                  </td>
                  <td>{app.applicant.email}</td>
                  <td>
                    <div className="badge badge-outline">
                      {app.applicant.appliedRole || "N/A"}
                    </div>
                  </td>
                  <td>{app.applicant.coverLetter || "N/A"}</td>
                  <td>
                    <a
                      href={app.applicant.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View CV
                    </a>
                  </td>
                  <td>
                    <div
                      className={`badge ${
                        app.status === "accepted"
                          ? "badge-success"
                          : app.status === "rejected"
                          ? "badge-error"
                          : app.status === "screening"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </div>
                  </td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                      className="select select-bordered select-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="screening">Screening</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
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

export default ViewApplications;
