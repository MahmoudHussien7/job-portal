// src/pages/JobDetailsPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobs } from "../app/slices/jobSlice";
import { submitApplication } from "../app/slices/applicationSlice";
import Loader from "../ui/Loader";
import UploadWidget from "../components/common/UploadWidget";

const JobDetails = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cvUrl, setCvUrl] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (!jobs.length) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);

  const job = jobs.find((job) => job.id === id);

  const handleUpload = (url) => {
    setCvUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job) {
      alert("Job information is missing.");
      return;
    }

    if (!cvUrl) {
      alert("Please upload your CV.");
      return;
    }

    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const coverLetter = form.coverLetter.value;

    const applicantData = {
      fullName,
      email,
      coverLetter,
      cv: cvUrl,
      appliedRole: job.title, // Add the job title as the applied role
    };

    const recruiterId = job.recruiterId;
    const jobId = job.id;

    setSubmitting(true);
    dispatch(submitApplication({ jobId, recruiterId, applicantData }))
      .unwrap()
      .then(() => {
        form.reset();
        setCvUrl(null);
        setShowApplyForm(false);
      })
      .catch((error) => {
        console.error("Submission failed:", error);
        alert("Failed to submit application. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading.fetch) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-600">Job not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-white">
      {/* Job Header Section */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="bg-white p-2 rounded shadow-sm">
              <img
                src={job.imgSrc || "/default-image.jpg"}
                alt="Company Logo"
                className="w-12 h-12"
                width={48}
                height={48}
                loading="lazy"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">
                {job.title || "Job Title Unavailable"}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                <span>{job.location || "Location not provided"}</span>
                <span>{job.category || "Not Specified"}</span>
                <span>{job.level}</span>
              </div>
              <div className="text-xs text-gray-500">Posted 20 days ago</div>
            </div>
          </div>
          <button
            onClick={() => setShowApplyForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Job description</h2>
          <a href="#" className="text-blue-600 text-sm">
            More jobs from Stack
          </a>
        </div>
        <p className="text-gray-700 mb-4">
          {job.aboutjob || "Description not available"}
        </p>
      </div>

      {/* Key Responsibilities Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Key responsibilities</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          {job.responsibilities?.length ? (
            job.responsibilities.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <>
              <li>
                Build, test, and deploy highly responsive web applications.
              </li>
              <li>Develop and maintain server-side applications.</li>
              <li>Ensure application efficiency, speed, and security.</li>
            </>
          )}
        </ol>
      </div>

      {/* Skills Required Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Skills required</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          {job.requirements?.length ? (
            job.requirements.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <li>Required skills are not available</li>
          )}
        </ol>
      </div>

      {/* Apply Button */}
      <div className="pb-4">
        <button
          onClick={() => setShowApplyForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
        >
          Apply Now
        </button>
      </div>

      {/* Modal for Application Form */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
            <button
              onClick={() => setShowApplyForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Submit Your Application
              </h3>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <textarea
                name="coverLetter"
                rows="4"
                placeholder="Cover Letter (Optional)"
                className="w-full p-2 border rounded"
              />
              <UploadWidget onUpload={handleUpload} />

              <button
                type="submit"
                disabled={submitting || !cvUrl}
                className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full ${
                  submitting || !cvUrl ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
