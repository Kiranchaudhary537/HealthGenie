import { createContext, useState, useEffect } from "react";

const MentalHealthFormContext = createContext({});

export const MentalHealthFormProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  
  const title = {
    0: "Basic Information",
    1: "Questions Part-1",
    2: "Questions Part-2",
  };

  const Questions = {
    que1: "What symptoms are you experiencing? (e.g. cough, fever, headache)",
    que2: "When did your symptoms begin? (Number of days)",
    que3: "Are your symptoms getting better, worse, or staying the same",
    que4: "Are you experiencing any pain or discomfort? If so, where is the pain/discomfort located?",
    que5: "Are you experiencing any other symptoms or conditions that may be related to your current symptoms?",
    que6: "Have you traveled to any other countries recently?",
    que7: "Have you been in contact with anyone who has a similar illness?",
    que8: "Do you have any pre-existing medical conditions?",
    que9: "Are you currently taking any medications or supplements",
    que10: "Have you ever experienced these symptoms before?",
  };

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    periods: "",
    que1: "",
    que2: "",
    que3: "",
    que4: "",
    que5: "",
    que6: "",
    que7: "",
    que8: "",
    que9: "",
    que10: "",
  });
  const [formErrors, setFormErrors] = useState({
    age: "",
    gender: "",
    periods: "",
    que1: "",
    que2: "",
    que3: "",
    que4: "",
    que5: "",
    que6: "",
    que7: "",
    que8: "",
    que9: "",
    que10: "",
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
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
      case "periods":
        if (formData.gender == "female" && value != "yes" && value != "no") {
          error = "Please select a valid answer on periods";
        }
        break;
      case /^que\d$/.test(name):
      case /^que10$/.test(name):
        if (isNaN(value) || value.trim() == "") {
          error = "Any Question shouldn't be empty";
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
      (formValues.some((value) => value === "") &&
        formData.gender == "female" &&
        formData.periods != "yes" &&
        formData.periods != "no")
    ) {
      alert("Please fill in all required fields correctly");
      return;
    }
    // console.log(formData);
  };

  const canSubmit =
    // (Object.values(formData).some((error) => error !== "") ||
    //   Object.values(formErrors).some((value) => value === "")) &&
    page === Object.keys(title).length - 1;

  const disablePrev = page === 0;

  const disableNext = page === Object.keys(title).length - 1;

  const prevHide = page === 0;

  const nextHide = page === Object.keys(title).length - 1;

  const submitHide = page !== Object.keys(title).length - 1;

  return (
    <MentalHealthFormContext.Provider
      value={{
        title,
        page,
        setPage,
        formData,
        Questions,
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
    </MentalHealthFormContext.Provider>
  );
};

export default MentalHealthFormContext;
