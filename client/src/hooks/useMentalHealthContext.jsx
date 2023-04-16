import { useContext } from "react";
import MentalHealthFormContext from "../context/MentalHealthFormContext";


const useMentalHealthContext = () => {
  return useContext(MentalHealthFormContext);
};

export default useMentalHealthContext;
