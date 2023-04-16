import { useEffect } from "react";
import useMentalHealthContext from "../../hooks/useMentalHealthContext";
import BasicInfo from "./BasicInfo";
import ListOfQuestions1 from "./ListOfQuestions1";
import ListOfQuestions2 from "./ListOfQuestions2";

const FormInputs = () => {
  const { page } = useMentalHealthContext();

  const display = {
    0: <BasicInfo />,
    1: <ListOfQuestions1 />,
    2: <ListOfQuestions2 />,
  };

  const content = <div className="form-inputs flex-col">{display[page]}</div>;

  return content;
};
export default FormInputs;
