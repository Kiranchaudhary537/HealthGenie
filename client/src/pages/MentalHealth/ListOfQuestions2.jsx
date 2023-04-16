import React from "react";
import { useState } from "react";
import useMentalHealthContext from "../../hooks/useMentalHealthContext";

export default function ListOfQuestions2() {
  const { title, page, formData, Questions, formErrors, handleChange } =
    useMentalHealthContext();

  return (
    <div className=" mt-96">
     <h4 className="mb-4 font-bold text-center">{page+1}/3</h4>
      {[6, 7, 8, 9, 10].map((num) => {
        return (
          <div className="mb-4 w-full">
            <div className="flex flex-col p-4 border rounded-lg">
              <label className="label mb-2">
                <span className="label-text">
                  {num}. {Questions[`que${num}`]}
                </span>
              </label>
              <input
                className={`appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formErrors[`que${num}`] && "border-red-500"
                }`}
                id={`que${num}`}
                type="text"
                placeholder="Type here"
                name={`que${num}`}
                value={formData[`que${num}`]}
                onChange={handleChange}
                required
              />
            </div>
            {formErrors[`que${num}`] && (
              <p className="text-red-500 text-xs italic">
                {formErrors[`que${num}`]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
