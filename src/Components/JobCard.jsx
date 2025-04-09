// JobCard.jsx
export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center mb-4">
        <img
          src={job.imgSrc}
          alt="Logo"
          className="w-10 h-10"
          width={40}
          height={40}
          loading="lazy"
          placeholder="blur"
        />
        <h3 className="ml-4 text-lg font-bold text-blue-700">{job.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{job.location}</p>
      <div className="mt-4 flex gap-2">
        <button className="btn btn-primary btn-sm">Apply now</button>
        <button  className="btn btn-outline btn-sm">Learn more</button>
      </div>
    </div>
  );
}
