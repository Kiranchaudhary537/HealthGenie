import { useContext } from "react";
import SymptomCheckerContext from "../context/SymtomCheckerContext";


const useSymtomChecker = () => {
  return useContext(SymptomCheckerContext);
};

export default useSymtomChecker;
