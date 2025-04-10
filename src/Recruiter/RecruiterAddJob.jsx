import { useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/Firebase/Config";
import { toast } from "react-toastify";

const RecruiterAddJob = () => {
  const { userData } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location) {
      toast.error("Title and location are required");
      return;
    }

    try {
      const jobData = {
        ...formData,
        recruiterId: userData.userId,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "jobs"), jobData);
      toast.success("Job posted successfully!");

      setFormData({
        title: "",
        level: "",
        category: "",
        location: "",
        imgSrc: "",
        aboutjob: "",
        requirements: [],
      });
    } catch (error) {
      toast.error("Failed to post job: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
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
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default RecruiterAddJob;
