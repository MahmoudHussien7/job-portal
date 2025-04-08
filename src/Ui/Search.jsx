import React from "react";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden max-w-3xl mx-auto p-2">
      {/* Search Input */}
      <div className="flex items-center px-4 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for jobs"
          className="outline-none text-gray-700 placeholder-gray-500 w-full"
        />
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300"></div>

      {/* Location Input */}
      <div className="flex items-center px-4 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-2.209 0-4 1.791-4 4s4 7 4 7 4-4.791 4-7-1.791-4-4-4z"
          />
        </svg>
        <input
          type="text"
          placeholder="Location"
          className="outline-none text-gray-700 placeholder-gray-500 w-full"
        />
      </div>

      {/* Search Button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium whitespace-nowrap">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
