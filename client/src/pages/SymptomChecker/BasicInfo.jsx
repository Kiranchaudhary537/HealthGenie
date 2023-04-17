import React from "react";
import useSymtomFormContext from "./../../hooks/useSymtomChecker";

import GeoRisk from "./GeoRisk";
export default function BasicInfo() {
  const { formData, formErrors, handleChange } = useSymtomFormContext();

  return (
    <div className="w-full  p-6 border border-gray-300 sm:rounded-md ">
      <div className="mb-4 flex flex-row">
        <div className="block text-gray-900  font-medium  w-32">
          Age <p className="p-2">{formData.age}</p>
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="relative w-full left-0" style={{ top: "-1rem" }}>
            <div className="h-2 text-xs flex rounded ">
              <div
                className="absolute w-full text-xs top-0 text-gray-500"
                style={{
                  transform: `translateX(${((formData.age - 18) / 55) * 100}%)`,
                }}
              >
                {formData.age}
              </div>
            </div>
          </div>
          <input
            type="range"
            name="age"
            id="age"
            min="18"
            max="70"
            value={formData.age}
            required
            onChange={handleChange}
            className="w-full h-2 appearance-none rounded-full bg-gray-300 mr-2"
          />
        </div>
        {formErrors.age && (
          <p className="text-red-500 text-xs italic">{formErrors.age}</p>
        )}
      </div>
      <div className="mb-4 flex flex-row  ">
        <label className="block   font-medium mr-4">Gender</label>
        <div className="self-center">
          <label className="inline-flex">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              className={`form-radio  h-5 w-5 text-cyan-600 ${
                formErrors.gender && "border-red-500"
              }`}
              required
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="inline-flex  ml-6">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              className={`form-radio h-5 w-5 text-cyan-600 ${
                formErrors.gender && "border-red-500"
              }`}
              required
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>
        {formErrors.gender && (
          <p className="text-red-500 text-xs italic">{formErrors.gender}</p>
        )}
      </div>
      <GeoRisk />
    </div>
  );
}
