export default function JobCard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png"
          alt="Logo"
          className="w-10 h-10"
          width={40}
          height={40}
          loading="lazy"
          placeholder="blur"
        />
        <h3 className="ml-4 text-lg font-bold text-blue-700">
          Full stack developer
        </h3>
      </div>
      <p className="text-sm text-gray-600">California, USA</p>
      <p className="text-sm text-gray-500 mt-2">
        You will be responsible for frontend and backend development...
      </p>
      <div className="mt-4 flex gap-2">
        <button className="btn btn-primary btn-sm">Apply now</button>
        <button className="btn btn-outline btn-sm">Learn more</button>
      </div>
    </div>
  );
}
