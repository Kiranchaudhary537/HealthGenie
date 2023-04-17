import React, { useEffect, useState } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";
import AXIOS from "../../utils/AXIOS";
import MultipleChoiceGroupQuestion from "./MultipleChoiceGroupQuestion";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import SingleAnswerQuestion from "./SingleAnswerQuestion";

function Diagnosis() {
  const [response, setResponse] = useState({});
  const { question, should_stop } = response || {};
  const {
    requestValue,
    formData,
    setFinalResponse,
    setRequestValue,
    setShouldStop,
  } = useSymtomChecker();

  useEffect(() => {
    const fetchData = async () => {
      await AXIOS.post("infermedica/diagnosis", requestValue)
        .then((response) => {
          setResponse(response.data);
        })
        .catch((error) => {
          setResponse([]);
        });
    };
    fetchData();
  }, [requestValue]);

  const renderQuestion = (question) => {
    switch (question.type) {
      case "group_single":
      case "scale":
        return <SingleChoiceQuestion question={question} />;
      case "group_multiple":
        return <MultipleChoiceGroupQuestion question={question} />;
      case "single":
        return <SingleAnswerQuestion question={question} />;
      default:
        return null;
    }
  };

  const handleDiagnosis = () => {
    const evidenceToAdd = Array.isArray(formData.Diagnosis)
      ? formData.Diagnosis.length > 0
        ? [...formData.Diagnosis]
        : { choice_id: "", id: "" }
      : formData.Diagnosis
      ? [formData.Diagnosis]
      : { choice_id: "", id: "" };

    setRequestValue({
      ...requestValue,
      sex: formData.gender,
      age: {
        unit: "year",
        value: formData.age,
      },
      evidence: [...requestValue.evidence, ...evidenceToAdd],
      extras: requestValue.extras,
    });
  };

  if (should_stop) {
    setShouldStop(true);
    setFinalResponse(response);
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8 ">
          <h2 className="text-xl">Submit For result</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div
        className={`bg-white flex flex-col  rounded-lg shadow overflow-hidden ${
          formData.Diagnosis ? "" : "border border-red-500"
        }`}
      >
        {question && <div>{renderQuestion(question)}</div>}
        <button
          type="button"
          className={`m-4 self-end px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline ${
            Array.isArray(formData.Diagnosis)
              ? formData.Diagnosis.some((d) => d.id == "" || d.choice_id == "")
                ? "bg-red-300 border border-red-500 text-red-800 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              : formData.Diagnosis &&
                formData.Diagnosis.id != "" &&
                formData.Diagnosis.choice_id != ""
              ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
              : "bg-red-300 border border-red-500 text-red-800 cursor-not-allowed"
          }`}
          onClick={handleDiagnosis}
          disabled={
            Array.isArray(formData.Diagnosis)
              ? formData.Diagnosis.some((d) => d.id == "" || d.choice_id == "")
              : !formData.Diagnosis ||
                formData.Diagnosis.id == "" ||
                formData.Diagnosis.choice_id == ""
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Diagnosis;
