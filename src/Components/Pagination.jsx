export default function Pagination() {
  return (
    <div className="mt-8 flex justify-center space-x-1">
      {[1, 2, 3, 4, 5].map((page) => (
        <button key={page} className="btn btn-sm">
          {page}
        </button>
      ))}
    </div>
  );
}
