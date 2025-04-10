import { useDispatch, useSelector } from "react-redux";
import { updatejob } from "../app/Slices/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const jobToEdit = jobs.find((job) => job.id === jobId);

  const [formData, setFormData] = useState({
    title: "",
    level: "",
    category: "",
    company: "",
    location: "",
    imgSrc: "",
    description: "",
    requirements: [],
  });

  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        title: jobToEdit.title || "",
        level: jobToEdit.level || "",
        category: jobToEdit.category || "",
        company: jobToEdit.company || "",
        location: jobToEdit.location || "",
        imgSrc: jobToEdit.imgSrc || "",
        description: jobToEdit.description || "",
        requirements: jobToEdit.requirements || [],
      });
    }
  }, [jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequirementChange = (index, value) => {
    const updated = [...formData.requirements];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, requirements: updated }));
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

    dispatch(updatejob({ jobId, updatedData: formData }))
      .unwrap()
      .then(() => {
        toast.success("Job updated successfully!");
        navigate("/recruiter/myjobs");
      })
      .catch((error) => {
        toast.error("Failed to update job: " + error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
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
          <label className="block font-semibold">Company</label>
          <input
            type="text"
            name="company"
            className="w-full border px-3 py-2 rounded"
            value={formData.company}
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
          <label className="block font-semibold">Job Description</label>
          <textarea
            name="description"
            className="w-full border px-3 py-2 rounded"
            rows="3"
            value={formData.description}
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
          disabled={loading.update}
        >
          {loading.update ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default EditJob;
