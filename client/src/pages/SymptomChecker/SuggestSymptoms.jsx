import React, { useEffect, useState, useRef } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";
import AXIOS from "../../utils/AXIOS";
import axios from "axios";

function SuggestSymptoms() {
  const [options, setOptions] = useState([]);
  const { formData, requestValue, formErrors, handleChange } =
    useSymtomChecker();
  const [selectedOption, setSelectedOption] = useState(
    formData.Suggestion.length > 0 ? [...formData.Suggestion] : []
  );

  const handleOptionSelect = (event) => {
    const { id, name } = event;
    const newselectedOption = {
      id,
      name,
      choice_id: "present",
      source: "suggest",
    };
    const isSelected = selectedOption.some(
      (option) => option.id === newselectedOption.id
    );
    if (isSelected) {
      setSelectedOption(
        selectedOption.filter((option) => option.id !== newselectedOption.id)
      );
    } else {
      setSelectedOption(selectedOption.concat(newselectedOption));
    }
  };
  const infermedicaEndpoint = "https://api.infermedica.com/v3";
  const infermedicaAppId = "1ce0a89b";
  const infermedicaAppKey = "b1c514e06870174c15fe79dbc20c67cf";
  // const infermedicaSuggestEndpoint = `${infermedicaEndpoint}/suggest`;
  const infermedicaDiagnosisAPIEndpoint = `${infermedicaEndpoint}/diagnosis`;
  const filteredSelectedOptions = requestValue.evidence.map((obj) => {
    const { name, ...rest } = obj;
    return rest;
  });

  const filteredEvidence = filteredSelectedOptions.filter(
    (obj) => obj.id !== "" && obj.choice_id !== ""
  );

  const updatedRequestValue = { ...requestValue, evidence: filteredEvidence };

  useEffect(() => {
    let timeoutId = null;

    const delayedFetchQuestion = () => {
      timeoutId = setTimeout(() => {
        axios
          .post(
            infermedicaSuggestEndpoint,
            JSON.stringify(updatedRequestValue),
            {
              headers: {
                "App-Id": infermedicaAppId,
                "App-Key": infermedicaAppKey,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            setOptions(response.data);
          })
          .catch((error) => {
            console.error(error);
            setOptions([]);
          });
      }, 1000);
    };

    delayedFetchQuestion();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const element = {
      target: {
        name: "Suggestion",
        value: selectedOption,
      },
    };
    handleChange(element);
  }, [selectedOption]);

  return (
    <div
      className={`w-full h-full border rounded-lg p-4  ${
        formErrors.Suggestion && "border-red-500"
      }`}
    >
      <h2 className="text-lg font-medium">Select Apropritate Option</h2>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2 md:flex-col md:flex-wrap md:gap-x-4 md:gap-y-2 lg:flex-col lg:flex-wrap lg:gap-x-4 lg:gap-y-2">
        {options?.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-2 text-gray-700 font-medium"
          >
            <input
              type="checkbox"
              className="form-checkbox"
              name="color"
              value={option.id}
              checked={selectedOption.some((e) => e.id == option.id)}
              onChange={() => handleOptionSelect(option)}
            />
            <span>{option.name}</span>
          </label>
        ))}
      </div>
      <div>
        {formErrors.Suggestion && (
          <p className="text-red-500 text-xs italic">{formErrors.Suggestion}</p>
        )}
      </div>
    </div>
  );
}

export default SuggestSymptoms;
