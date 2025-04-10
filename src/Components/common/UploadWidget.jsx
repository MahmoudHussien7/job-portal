// src/components/common/UploadWidget.jsx
import { useEffect, useRef, useState } from "react";

const UploadWidget = ({ onUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedUrl, setUploadedUrl] = useState(null);

  useEffect(() => {
    // Load Cloudinary script dynamically
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dwcxvrb0c", // Replace with your Cloudinary cloud name
          uploadPreset: "job_portal_cv_upload", // Replace with your upload preset
          sources: ["local"], // Allow only local file uploads
          multiple: false, // Allow only one file
          resourceType: "raw", // For non-image files like PDFs, DOCs
          clientAllowedFormats: ["pdf", "doc", "docx"], // Restrict to CV file types
          maxFileSize: 5000000, // 5MB limit
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const url = result.info.secure_url;
            setUploadedUrl(url);
            onUpload(url); // Pass the URL to the parent component
          } else if (error) {
            console.error("Upload error:", error);
          }
        }
      );
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, [onUpload]);

  const handleClick = () => {
    widgetRef.current.open();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload CV
      </button>
      {uploadedUrl && (
        <p className="mt-2 text-green-600">
          CV Uploaded:{" "}
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadWidget;
