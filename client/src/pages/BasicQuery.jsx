import React, { useState } from "react";
import AXIOS from "../utils/AXIOS";

export default function BasicQuery() {
  const [answer, setAnswer] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    age: "",
    gender: "",
  });
  const [formErrors, setFormErrors] = useState({
    question: "",
    age: "",
    gender: "",
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "question":
        if (isNaN(value) || value.trim() == "") {
          error = "Enter your question here";
        }
        break;
      case "age":
        if (isNaN(value) || value < 0) {
          error = "Age must be a positive number";
        }
        break;
      case "gender":
        if (value !== "male" && value !== "female") {
          error = "Please select a valid gender";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = Object.values(formData);
    const formErrorValues = Object.values(formErrors);
    if (
      formErrorValues.some((error) => error !== "") ||
      formValues.some((value) => value === "")
    ) {
      AXIOS.post("/basicquery", { formData })
        .then((res) => {
          setAnswer(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    console.log(formData);
  };

  return (
    <>
      <div class="w-full  mx-auto max-w-2xl max-w-lg  border border border-gray-300 p-8 rounded-md">
        {answer != null ? (
          <div className="p-8 ">
            <p className="text-lg mb-4 ">Your Question is </p>
            <p className="text-2lg mb-4 ">{formData.question}</p>
            <p className="text-lg mt-4 ">{answer.content}</p>
          </div>
        ) : (
          <>
            <h1 class="text-2xl text-center font-medium mb-2">Basic Query</h1>
            <form class="flex flex-col mt-4" onSubmit={handleSubmit}>
              <textarea
                className="w-full border px-4 py-2 rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                style={{ resize: "none" }}
                name="question"
                required
                onChange={handleChange}
                placeholder="Write your symptom or condition in detail, e.g. I had a headache and vomited several times, and I had a sore throat..."
                rows={6}
              />
              <div className="flex flex-col mb-4">
                <div class="my-4 flex flex-row">
                  <p className="block text-gray-900  font-medium  w-32">
                    Age <snap className="p-2">{formData.age}</snap>
                  </p>
                  <div className="flex w-full flex-col items-center">
                    <div
                      className="relative w-full left-0"
                      style={{ top: "-1rem" }}
                    >
                      <div className="h-2 text-xs flex rounded ">
                        <div
                          className="absolute w-full text-xs top-0 text-gray-500"
                          style={{
                            transform: `translateX(${
                              ((formData.age - 18) / 55) * 100
                            }%)`,
                          }}
                        >
                          {formData.age}
                        </div>
                      </div>
                    </div>
                    <input
                      type="range"
                      id="age"
                      min="18"
                      max="70"
                      name="age"
                      value={formData.age}
                      required
                      onChange={handleChange}
                      className="w-full h-2 appearance-none rounded-full bg-gray-300 mr-2"
                    />
                  </div>
                  {formErrors.age && (
                    <p className="text-red-500 text-xs italic">
                      {formErrors.age}
                    </p>
                  )}
                </div>
                <div className="mb-4 flex flex-row    ">
                  <label className="block text-gray-700  font-bold mr-4">
                    Gender
                  </label>
                  <div>
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
                    <p className="text-red-500 text-xs italic">
                      {formErrors.gender}
                    </p>
                  )}
                </div>
              </div>
              <button class="self-center mt-4 px-4 py-2 font-bold text-white bg-cyan-950  rounded hover:bg-cyan-700 focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
