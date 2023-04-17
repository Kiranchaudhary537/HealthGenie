import React, { useEffect, useState } from "react";
import questions from "./../../assets/data/geo-risks-factor.json";
import useSymtomChecker from "./../../hooks/useSymtomChecker";

function GeoRisk() {
  const { formData, formErrors, handleChange } = useSymtomChecker();

  const [selectedResidencesOrTravel, setSelectedResidencesOrTravel] = useState(
    []
  );

  const handleOptionSelect = (event) => {
    const { id, name } = event;
   
    const newselectedOption = {
      id,
      name,
      choice_id: "present",
      source: "predefined",
    };

    //check wheter selected or not
    const isSelected = selectedResidencesOrTravel.some(
      (option) => option.id === newselectedOption.id
    );

    // update state
    if (isSelected) {
      setSelectedResidencesOrTravel(
        selectedResidencesOrTravel.filter(
          (option) => option.id !== newselectedOption.id
        )
      );
    } else {
      setSelectedResidencesOrTravel(
        selectedResidencesOrTravel.concat(newselectedOption)
      );
    }
  };

  // change form data. handlechange is context file

  useEffect(() => {
    const element = {
      target: {
        name: "ResidenceOrTravel",
        value: selectedResidencesOrTravel,
      },
    };
    handleChange(element);
  }, [selectedResidencesOrTravel]);

  const options = questions.map((option) => (
    <div key={option.id} className="flex flex-row ">
      <input
        type="checkbox"
        className="form-checkbox mb-2 mx-4"
        id={option.id}
        name={option.name}
        value={option.id}
        checked={selectedResidencesOrTravel.some(
          (item) => item.id === option.id
        )}
        onChange={() => handleOptionSelect(option)}
      />
      <label
        htmlFor={option.id}
        className="block text-gray-700 font-medium mb-2"
      >
        {option.name}
      </label>
    </div>
  ));

  return (
    <div
      className={` border-gray-300 sm:rounded-md  ${
        formErrors.ResidenceOrTravel && "border-red-500"
      } `}
    >
      <p className="mb-4 font-medium block ">
        Select your residence or recent travel places{" "}
      </p>
      {options}

      {formErrors.ResidenceOrTravel && (
        <p className="text-red-500 text-xs italic">
          {formErrors.ResidenceOrTravel}
        </p>
      )}
      <p className="text-light mt-4">
        You selected:{" "}
        {selectedResidencesOrTravel.map((item) => item.id).join(", ")}
      </p>
    </div>
  );
}
export default GeoRisk;
