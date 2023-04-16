import React, { useEffect, useState } from "react";
import options from "./../../assets/data/geo-risks-factor.json";
import useSymtomChecker from "./../../hooks/useSymtomChecker";

function GeoRisk() {
  const { formData, formErrors, handleChange } = useSymtomChecker();

  const [selectedOptions, setSelectedOptions] = useState(
     []
  );

  const handleOptionSelect = (event) => {
    const { id, name } = event;
    console.log(selectedOptions);
    const newselectedOption = {
      id,
      name,
      choice_id: "present",
      source: "predefined",
    };
    const isSelected = selectedOptions.some(
      (option) => option.id === newselectedOption.id
    );
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((option) => option.id !== newselectedOption.id)
      );
    } else {
      setSelectedOptions(selectedOptions.concat(newselectedOption));
    }
  };
  const filteredSelectedOptions = selectedOptions.map(obj => {
    const { name, ...rest } = obj;
    return rest;
  });
  
  useEffect(() => {
    const element = {
      target: {
        name: "ResidenceOrTravel",
        value: filteredSelectedOptions,
      },
    };
    handleChange(element);
  }, [selectedOptions]);

  return (
    <div
      className={` border-gray-300 sm:rounded-md  ${
        formErrors.ResidenceOrTravel && "border-red-500"
      } `}
    >
      <p className="mb-4 font-medium block ">
        Select residence or recent travel Place{" "}
      </p>
      {options.map((option) => (
        <div key={option.id} className="flex flex-row ">
          <input
            type="checkbox"
            className="form-checkbox mb-2 mx-4"
            id={option.id}
            name={option.name}
            value={option.id}
            checked={selectedOptions.some((item) => item.id === option.id)}
            onChange={() => handleOptionSelect(option)}
          />
          <label
            htmlFor={option.id}
            className="block text-gray-700 font-medium mb-2"
          >
            {option.name}
          </label>
        </div>
      ))}
      {formErrors.ResidenceOrTravel && (
        <p className="text-red-500 text-xs italic">
          {formErrors.ResidenceOrTravel}
        </p>
      )}
      <p className="text-light mt-4">
        You selected:{" "}
        {formData.ResidenceOrTravel.map((item) => item.id).join(", ")}
      </p>
    </div>
  );
}

export default GeoRisk;
