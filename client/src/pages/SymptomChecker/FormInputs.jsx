import { useEffect } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";
import BasicInfo from "./BasicInfo";
import CommanRisk from "./CommanRisk";
import Diagnosis from "./Diagnosis";
import InitialSymptoms from "./InitialSymtoms";
import SuggestSymptoms from "./SuggestSymptoms";
import Response from "./Response";

const FormInputs = () => {
  const { page, formData, finalResponse, requestValue, setRequestValue } =
    useSymtomChecker();

  const display = {
    0: <BasicInfo />,
    1: <CommanRisk />,
    2: <InitialSymptoms />,
    3: <SuggestSymptoms />,
    4: <Diagnosis />,
    5: <Response response={finalResponse} />,
  };

  const evidenceToAdd = Array.isArray(formData.Diagnosis)
    ? formData.Diagnosis.length > 0
      ? [...formData.Diagnosis]
      : { choice_id: "", id: "" }
    : formData.Diagnosis
    ? [formData.Diagnosis]
      : { choice_id: "", id: "" };
  
  useEffect(() => {
    if (page >= 0) {
      setRequestValue({
        sex: formData.gender,
        age: {
          unit: "year",
          value: formData.age,
        },
        evidence: [
          ...formData.ResidenceOrTravel,
          ...formData.CommanRisk,
          ...formData.Symptoms,
          ...formData.Suggestion,
          evidenceToAdd,
        ],
        extras: requestValue.extras,
      });
    }
  }, [page]);

  const content = <div className="form-inputs flex-col">{display[page]}</div>;

  return content;
};
export default FormInputs;
