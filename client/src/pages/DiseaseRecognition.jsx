import React, { useState } from "react";

export default function DiseaseRecognition() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > 1024 * 1024 * 3) {
      // Limit to 1 MB
      alert("File size should be less than 3 MB");
      event.target.value = null; // Reset the input field
      setFile(null); // Reset the state
    } else {
      setFile(selectedFile);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
    } else {
      console.log("Please upload an image");
    }
  };
  return (
    <div className="w-full border border-gray-300 shadow-md m-4 bg-white p-8 rounded-md">
      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        <span className="mb-2 text-xs text-gray-500">
          Only JPG, JPEG, and PNG images are accepted and
          <br />
          Size of image should be less than 3 MB
        </span>

        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
          className="py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          className="self-center mt-4 px-4 py-2 font-bold text-white bg-cyan-950  rounded hover:bg-cyan-700 focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!file}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
