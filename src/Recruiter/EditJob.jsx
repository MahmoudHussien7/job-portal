import { useDispatch, useSelector } from "react-redux";
import { updatejob } from "../app/Slices/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobId } = useParams(); // get job id from URL
  const { jobs } = useSelector((state) => state.jobs);
  const jobToEdit = jobs.find((job) => job.id === jobId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    // Add other fields you use
  });

  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        title: jobToEdit.title || "",
        description: jobToEdit.description || "",
        company: jobToEdit.company || "",
        location: jobToEdit.location || "",
      });
    }
  }, [jobToEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatejob({ jobId, updatedData: formData })).then(
      () => navigate("/recruiter/myjobs") // or wherever you want to redirect
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
