import React from "react";

function Navbar() {
  return (
    <div className="mb-10 mx-16 ">
      <nav className="flex w-full justify-between p-4">
        <div className="text-lg font-bold">Job Portal</div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-violet-500">
              Home
            </a>
          </li>
          <li>
            <a href="/jobs" className="hover:text-violet-500">
              Jobs
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-violet-500">
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
