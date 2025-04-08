import SearchBar from "../Ui/Search";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl w-full p-12 bg-gradient-to-r from-violet-800 to-violet-950 text-white text-center ">
      <h1 className="text-6xl font-bold">
        Over 10,000 possibilities await you!
      </h1>
      <p className="mt-4 text-lg w-[550px] h-[50px]">
        Your Next Big Career Move Starts Right Here - Explore the Best Job
        Opportunities and Take the First Step Toward Your Future!
      </p>
      <div className=" flex items-center justify-center p-6 mt-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
