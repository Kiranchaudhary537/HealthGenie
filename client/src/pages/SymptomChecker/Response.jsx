import React, { useEffect, useState } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";
function Response({ response }) {
  const { page, resetForm } = useSymtomChecker();
  useEffect(() => {
    resetForm();
  }, []);
  return (
    <div>
      <div>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8 ">
            {response?.conditions?.slice(0, 3).map((condition, index) => (
              <div
                key={index}
                className={`${
                  index !== 0
                    ? "border-t mt-4 border-gray-200 md:flex"
                    : "md:flex"
                }`}
              >
                <div className="p-4 ">
                  <a
                    href={`https://www.google.com/search?q=${condition.condition_details.category.name}`}
                    className="uppercase hover:underline tracking-wide text-sm text-indigo-500 font-semibold"
                  >
                    {condition.condition_details.category.name}
                  </a>
                  <div className="block mt-1 text-lg leading-tight font-medium text-black ">
                    {condition.name}
                  </div>
                  <div className="flex flex-row flex-wrap mt-2">
                    <p className="mr-2 text-sm font-light text-gray-500 hover:text-gray-900">
                      {condition.common_name}
                    </p>
                    <p className="mx -2 text-sm font-light text-gray-500 hover:text-gray-900">
                      Probability: {condition.probability.toFixed(4)}
                    </p>
                  </div>
                  <p className="mt-2 text-gray-500">
                    Severity: {condition.condition_details.severity}
                  </p>
                  <p className="mt-2 text-gray-500">
                    Acuteness: {condition.condition_details.acuteness}
                  </p>
                  <p className="mt-2 text-gray-500">
                    Hint: {condition.condition_details.hint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* GPT-3 part */}
      <div></div>
      {/* Other article and other part */}
      <div></div>
    </div>
  );
}

export default Response;
