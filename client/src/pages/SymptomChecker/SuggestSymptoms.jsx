import React, { useEffect, useState, useRef } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";
import AXIOS from "../../utils/AXIOS";

function SuggestSymptoms() {
  const [options, setOptions] = useState([]);
  const { requestValue, formErrors, handleChange } = useSymtomChecker();
  const [selectedOption, setSelectedOption] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      await AXIOS.post("infermedica/suggest", requestValue)
        .then((response) => {
          setOptions(response.data);
        })
        .catch((error) => {
          setOptions([]);
        });
    };
    fetchData();
  }, [requestValue]);

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
