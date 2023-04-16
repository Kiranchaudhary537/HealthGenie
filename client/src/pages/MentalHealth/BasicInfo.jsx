import React from "react";
import useMentalHealthContext from "../../hooks/useMentalHealthContext";

export default function BasicInfo() {
  const { title, page, formData, formErrors, handleChange } =
    useMentalHealthContext();

  return (
    <div>
      <div className="mb-4">
        <h4 className="mb-4 font-bold text-center">{page + 1}/3</h4>
        <div className="flex flex-row">
          <input
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formErrors.age && "border-red-500"
            }`}
            id="age"
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        {formErrors.age && (
          <p className="text-red-500 text-xs italic">{formErrors.age}</p>
        )}
      </div>
      <div className="mb-4 flex flex-row  ">
        <label className="block text-gray-700  font-bold mr-4">Gender</label>
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
      {formData.gender == "female" ? (
        <div className="mb-4 flex flex-row  ">
          <label className="block text-gray-700  font-bold mr-4">
            Are you having periods?
          </label>
          <div className="self-center">
            <label className="inline-flex">
              <input
                type="radio"
                name="periods"
                value="yes"
                checked={formData.periods === "yes"}
                onChange={handleChange}
                className={`form-radio  h-5 w-5 text-cyan-600 ${
                  formErrors.periods && "border-red-500"
                }`}
                required
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex  ml-6">
              <input
                type="radio"
                name="periods"
                value="no"
                checked={formData.periods === "no"}
                onChange={handleChange}
                className={`form-radio h-5 w-5 text-cyan-600 ${
                  formErrors.periods && "border-red-500"
                }`}
                required
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
          {formErrors.periods && (
            <p className="text-red-500 text-xs italic">{formErrors.periods}</p>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
