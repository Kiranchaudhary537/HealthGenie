import { useEffect, useState } from "react";
import useSymtomChecker from "./../../hooks/useSymtomChecker";
const questions = [
  {
    id: "p_8",
    name: "I have diabetes",
    choices: [
      { id: "present", name: "Yes" },
      { id: "absent", name: "No" },
      { id: "unknown", name: "Don't know" },
    ],
  },
  {
    id: "p_7",
    name: "I'm overweight or obese",
    choices: [
      { id: "present", name: "Yes" },
      { id: "absent", name: "No" },
      { id: "unknown", name: "Don't know" },
    ],
  },
  {
    id: "p_9",
    name: "I have hypertension",
    choices: [
      { id: "present", name: "Yes" },
      { id: "absent", name: "No" },
      { id: "unknown", name: "Don't know" },
    ],
  },
  {
    id: "p_28",
    name: "I smoke cigarettes",
    choices: [
      { id: "present", name: "Yes" },
      { id: "absent", name: "No" },
      { id: "unknown", name: "Don't know" },
    ],
  },
  {
    id: "p_264",
    name: "I've recently suffered an injury",
    choices: [
      { id: "present", name: "Yes" },
      { id: "absent", name: "No" },
      { id: "unknown", name: "Don't know" },
    ],
  },
  {
    id: "p_10",
    name: "I have high cholesterol",
    choices: [
      { id: "present", name: "Yes" },
      { id: "absent", name: "No" },
      { id: "unknown", name: "Don't know" },
    ],
  },
];
const femaleSpecificQuestions = [
  {
    id: "p_11",
    name: "Postmenopause",
    choices: [
      { id: "present", name: "Yes" },
      { id: "absent", name: "No" },
      { id: "unknown", name: "Don't know" },
    ],
  },
];
const responseForFemale = [
  {
    id: "p_8",
    name: "I have diabetes",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_7",
    name: "I'm overweight or obese",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_9",
    name: "I have hypertension",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_28",
    name: "I smoke cigarettes",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_264",
    name: "I've recently suffered an injury",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_10",
    name: "I have high cholesterol",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_11",
    name: "Postmenopause",
    choice_id: "",
    source: "predefined",
  },
];
const responseForMale = [
  {
    id: "p_8",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_7",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_9",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_28",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_264",
    choice_id: "",
    source: "predefined",
  },
  {
    id: "p_10",
    choice_id: "",
    source: "predefined",
  },
];

function SurveyQuestion({
  commanRisk,
  key,
  question,
  selectedChoice,
  setSelectedChoice,
}) {
  const { handleChange } = useSymtomChecker();

  const handleSelectledChoice = (e) => {
    setSelectedChoice(e.target.value);
  };

  useEffect(() => {
    const element = {
      target: {
        name: "CommanRisk",
        value: commanRisk,
      },
    };
    handleChange(element);
  }, [commanRisk]);

  return (
    <div
      key={key}
      className="mb-4 flex flex-row border-b justify-between mx-4 m-1 "
    >
      <label className="block text-gray-700 font-medium mb-2">
        {question.name}
      </label>
      <div className="flex flex-wrap   mx-2">
        {question.choices.map((choice) => (
          <div className="px-2 w-1/3">
            <label key={choice.id} className="block  text-gray-700 font-medium">
              <input
                type="radio"
                className="form-radio"
                name={question.id}
                value={choice.id}
                checked={selectedChoice === choice.id}
                onChange={(e) => handleSelectledChoice(e)}
              />
              <span className="">{choice.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommanRisk() {
  const { formData, formErrors } = useSymtomChecker();

  const [commanRisk, setCommanRisk] = useState(
    formData.CommanRisk.length > 0
      ? [...formData.CommanRisk]
      : formData.gender == "female"
      ? responseForFemale
      : responseForMale
  );

  const handleResponseChange = (id, name, value) => {
    setCommanRisk(
      commanRisk.map((response) =>
        response.id === id ? { ...response, choice_id: value } : response
      )
    );
  };

  const questionArrayToUse =
    formData.gender === "female"
      ? [...questions, ...femaleSpecificQuestions]
      : questions;

  useEffect(() => {
    if (
      formData.gender === "female" &&
      !commanRisk.some((response) => response.id === "p_11")
    ) {
      setCommanRisk([
        ...commanRisk,
        {
          id: "p_11",
          choice_id: "unknown",
          source: "predefine",
        },
      ]);
    }
  }, [questionArrayToUse]);

  return (
    <div
      className={`border rounded-lg  m-4 p-4 w-full ${
        formErrors.CommanRisk && "border-red-500"
      }`}
    >
      <h4 className="mb-4 font-medium text-2xl text-center">
        Please check all the statements below that apply to you
      </h4>
      <div className="p-2 mt-4">
        {questionArrayToUse.map((question, i) => (
          <div key={i}>
            <SurveyQuestion
              commanRisk={commanRisk}
              key={i}
              question={question}
              selectedChoice={commanRisk[i]?.choice_id}
              setSelectedChoice={(value) =>
                handleResponseChange(question.id, question.name, value)
              }
            />
          </div>
        ))}
      </div>
      <div>
        {formErrors.CommanRisk && (
          <p className="text-red-500 text-xs italic">{formErrors.CommanRisk}</p>
        )}
      </div>
    </div>
  );
}

export default CommanRisk;
