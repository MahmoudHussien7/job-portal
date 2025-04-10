export default function SidebarFilter() {
  return (
    <div>
      <h3 className="font-bold mb-2">Search by Categories</h3>
      <div className="space-y-1">
        {["Programming", "Marketing", "Designing", "Accounting"].map((cat) => (
          <label key={cat} className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox" />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <h3 className="font-bold mt-6 mb-2">Search by Location</h3>
      <div className="space-y-1">
        {["Egypt", "Remote", "London", "Tokyo"].map((loc) => (
          <label key={loc} className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox" />
            <span>{loc}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
