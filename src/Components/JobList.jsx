import JobCard from "./JobCard";

export default function JobList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, idx) => (
        <JobCard key={idx} />
      ))}
    </div>
  );
}
