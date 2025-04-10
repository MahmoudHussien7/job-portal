// src/Components/Admin/AddJob.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addjob } from "../../features/jobs/jobSlice";
import { Navigate } from "react-router-dom";

const AddJob = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.jobs);

  const [formData, setFormData] = useState({
    title: "",
    id: Math.floor(Math.random() * 1000).toLocaleString(),
    level: "",
    category: "",
    location: "",
    imgSrc: "",
    aboutjob: "",
    requirements: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData((prev) => ({ ...prev, requirements: newRequirements }));
  };

  const handleAddRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location) {
      toast.error("Title and location are required");
      return;
    }
    dispatch(addjob(formData))
      .unwrap()
      .then(() => {
        toast.success("Job added successfully!");
        setFormData({
          id: Math.floor(Math.random() * 1000).toLocaleString,
          title: "",
          level: "",
          category: "",
          location: "",
          imgSrc: "",
          aboutjob: "",
          requirements: [],
        });
      })
      .catch((error) => {
        toast.error("Failed to add job: " + error);
      });
    Navigate("/viewjobs", { replace: true });
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border px-3 py-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Level</label>

          <input
            type="text"
            name="level"
            className="w-full border px-3 py-2 rounded"
            value={formData.level}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Category</label>

          <input
            type="text"
            name="category"
            className="w-full border px-3 py-2 rounded"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border px-3 py-2 rounded"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            name="imgSrc"
            className="w-full border px-3 py-2 rounded"
            value={formData.imgSrc}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">About Job</label>
          <textarea
            name="aboutjob"
            className="w-full border px-3 py-2 rounded"
            rows="3"
            value={formData.aboutjob}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Requirements</label>
          {formData.requirements.map((req, index) => (
            <input
              key={index}
              type="text"
              className="w-full border px-3 py-2 mb-2 rounded"
              value={req}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={handleAddRequirement}
            className="text-blue-500 hover:underline"
          >
            + Add Requirement
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading.add}
        >
          {loading.add ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
