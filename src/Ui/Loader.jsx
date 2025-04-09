import React from "react";

const Loader = ({ size = "xxlarge" }) => {
  const sizes = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
    xlarge: "h-10 w-10",
    xxlarge: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center content-center">
      <span className={`loading loading-ring ${sizes[size]}`}></span>
    </div>
  );
};

export default Loader;
