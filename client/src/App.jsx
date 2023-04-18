import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Layout from "./Components/Layout";
import BasicQuery from "./pages/BasicQuery";
import SymptomChecker from "./pages/SymptomChecker";
import MentalHealth from "./pages/MentalHealth";
import DiseaseRecognition from "./pages/DiseaseRecognition";
import { MentalHealthFormProvider } from "./context/MentalHealthFormContext";
import { SymptomCheckerProvider } from "./context/SymtomCheckerContext";
import { Login } from "./Auth/Auth";
import PrivateRoute from "./PrivateRoutes";

function App() {
  return (
    <SymptomCheckerProvider>
      <MentalHealthFormProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<BasicQuery />} />
                <Route index path="/basicquery" element={<BasicQuery />} />
                {/* <Route exact path="/mentalhealth" element={<MentalHealth />} />
                <Route
                  exact
                  path="/diseaserecongination"
                  element={<DiseaseRecognition />}
                /> */}
                <Route
                  exact
                  path="/symptomchecker"
                  element={<SymptomChecker />}
                />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </MentalHealthFormProvider>
    </SymptomCheckerProvider>
  );
}

export default App;
