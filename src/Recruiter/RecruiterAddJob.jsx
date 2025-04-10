import { useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/Firebase/Config";
import { toast } from "react-toastify";

const RecruiterAddJob = () => {
  const { userData } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobData = {
        ...form,
        recruiterId: userData.userId,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "jobs"), jobData);
      toast.success("Job posted successfully!");
      setForm({ title: "", description: "", company: "", location: "" });
    } catch (error) {
      toast.error("Failed to post job: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-1/2 mx-auto mt-10"
    >
      <input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="company"
        placeholder="Company Name"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Post Job
      </button>
    </form>
  );
};

export default RecruiterAddJob;
