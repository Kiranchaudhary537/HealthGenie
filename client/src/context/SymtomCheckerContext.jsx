import { createContext, useState, useEffect } from "react";
import { checkNextHide } from "../utils/checkNextHide";

const SymptomCheckerContext = createContext({});

export const SymptomCheckerProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [finalResponse, setFinalResponse] = useState({});
  const [shouldStop, setShouldStop] = useState(false);
  const title = {
    0: "Basic Information",
    1: "Comman Risks",
    2: "Add your symptoms or Condition",
    4: "suggestion",
    5: "dianosis",
    6: "result",
  };

  const [formData, setFormData] = useState({
    age: 20,
    gender: "",
    ResidenceOrTravel: [],
    CommanRisk: [],
    Symptoms: [],
    Suggestion: [],
    Diagnosis: [],
  });
  const [formErrors, setFormErrors] = useState({
    age: "",
    gender: "",
    ResidenceOrTravel: "",
    CommanRisk: "",
    Symptoms: "",
    Suggestion: "",
    Diagnosis: "",
  });
  const generateInterviewId = () => {
    const uuidv4 = function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      ); // eslint-disable-line
    };

    const id = uuidv4();
    return id;
  };
  const [requestValue, setRequestValue] = useState({
    sex: formData.gender,
    age: {
      unit: "year",
      value: formData.age,
    },
    evidence: [],
    extras: {
      article_set: "en",
      enable_explanations: true,
      enable_triage_3: true,
      interview_mode: "triage",
      include_condition_details: true,
      include_extended_conditions: true,
    },
  });
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "age":
        if (isNaN(value) || value < 0) {
          error = "Age must be a positive number";
        }
        break;
      case "ResidenceOrTravel":
        if (value.length <= 0) {
          error = "Residence or recent travel should not be empty";
        }
        break;
      case "gender":
        if (value !== "male" && value !== "female") {
          error = "Please select a valid gender";
        }
        break;
      case "CommanRisk":
        if (value.some((d) => d.id == "" || d.choice_id == "")) {
          error = "Answer should not be empty";
        }
        break;
      case "Symptoms":
        if (value.length <= 0) {
          error = "Atleast select  one symptoms";
        }
        break;
      case "Suggestion":
        if (value.length <= 0) {
          error = "Select appropriate Suggestion";
        }
        break;
      case "Diagnosis":
        if (value.length <= 0) {
          error = "atleast one symptoms";
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
    if (
      name == "ResidenceOrTravel" ||
      name == "CommanRisk" ||
      name == "Suggestion" ||
      name == "Diagnosis" ||
      name == "Symptoms"
    ) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
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
      alert("Please fill in all required fields correctly");
      return;
    }
    console.log(formData);
  };

  const canSubmit = (page == 5 && shouldStop);

  const disablePrev = page === 0;

  const disableNext =
    (Object.values(formErrors).some((error) => error !== "") ||
      Object.values(formData).some((value) => value.length === 0)) &&
    page === Object.keys(title).length - 1;

  const prevHide = page === 0;
  const nextHide = checkNextHide(page, formData, formErrors);

  const submitHide = !shouldStop;

  return (
    <SymptomCheckerContext.Provider
      value={{
        title,
        requestValue,
        finalResponse,
        setFinalResponse,
        setShouldStop,
        setRequestValue,
        page,
        setPage,
        formData,
        formErrors,
        handleChange,
        handleSubmit,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
      }}
    >
      {children}
    </SymptomCheckerContext.Provider>
  );
};

export default SymptomCheckerContext;
