import { useParams } from "react-router-dom";

const JobDetails = ({ jobs }) => {
  const { id } = useParams();
  const job = jobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div>
      <img
        src={job.imgSrc}
        alt="Logo"
        className="w-10 h-10"
        width={40}
        height={40}
        loading="lazy"
        placeholder="blur"
      />
      <h1>{job.title}</h1>
      <p>{job.location}</p>
      <p>{job.aboutjob}</p>
      <h2>Requirements</h2>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobDetails;
