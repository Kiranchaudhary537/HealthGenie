import React, { useState, useEffect } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";

function SingleChoiceQuestion({ question }) {
  const [selectedValue, setSelectedValue] = useState({});
  const { handleChange } = useSymtomChecker();
  const { text, items } = question;

  const handleOptionChange = (event) => {
    setSelectedValue({ id: event.target.id, choice_id: "present" });
  };

  useEffect(() => {
    
    const element = {
      target: {
        name: "Diagnosis",
        value: selectedValue,
      },
    };
    handleChange(element);
  }, [selectedValue]);

  useEffect(() => {
    setSelectedValue({ choice_id: "", id: "" });
  }, [items]);
  
  const options = items.map((item, index) => (
    <div
      key={item.id}
      id={item.id}
      value={item.name}
      className={`block border  px-4 py-2  ${
        index === 0 ? "" : "border-t border-gray-300"
      } cursor-pointer select-none hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500`}
      onClick={(e) => handleOptionChange(e)}
    >
      <input
        name={text}
        id={item.id}
        value={item.name}
        onChange={(e) => handleOptionChange(e)}
        type="radio"
        className="form-radio "
        checked={selectedValue.id === item.id}
      />
      <label
        id={item.id}
        value={item.name}
        onClick={(e) => handleOptionChange(e)}
        htmlFor={item.id}
        className=" ml-2"
      >
        {item.name}
      </label>
    </div>
  ));

  return (
    <div className="m-4">
      <h2 className="font-bold text-lg mb-2">{text}</h2>
      {options}
    </div>
  );
}

export default SingleChoiceQuestion;
