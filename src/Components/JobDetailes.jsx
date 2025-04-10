import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // إضافة useSelector
import { useParams } from "react-router-dom";
import { fetchJobs } from "../app/Slices/jobSlice";
import Loader from "../Ui/Loader";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (!jobs.length) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);
  const job = jobs.find((job) => job.id === id);

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
        <p className="text-xl text-red-600">Job not found</p>{" "}
      </div>
    );
  }

  return (
    <div className=" mx-auto p-4 bg-white">
      {/* Job Header Section */}
      <div className="bg-blue-50  p-6 rounded-lg mb-6">
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
                {job.title || "Job Title Unavailable"}{" "}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <span>{job.location || "Location not provided"}</span>{" "}
                </div>
                <div className="flex items-center">
                  <span>{job.category || "Not Specified"}</span>{" "}
                </div>
                <div className="flex items-center">
                  <span>{job.level}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">Posted 20 days ago</div>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium">
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
        </p>{" "}
      </div>

      {/* Key Responsibilities Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Key responsibilities</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          {job.responsibilities && job.responsibilities.length > 0 ? (
            job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))
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
          {job.requirements && job.requirements.length > 0 ? (
            job.requirements.map((req, index) => <li key={index}>{req}</li>)
          ) : (
            // إضافة رسالة في حالة غياب المهارات المطلوبة
            <li>Required skills are not available</li>
          )}
        </ol>
      </div>

      {/* Apply Button */}
      <div className="pb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded font-medium">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
