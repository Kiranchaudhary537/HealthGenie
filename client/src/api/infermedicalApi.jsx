import axios from "axios";

const infermedicaEndpoint = "https://api.infermedica.com/v3";
const infermedicaAppId = "1ce0a89b";
const infermedicaAppKey = "b1c514e06870174c15fe79dbc20c67cf";
const infermedicaSuggestEndpoint = `${infermedicaEndpoint}/suggest`;
const infermedicaDiagnosisAPIEndpoint = `${infermedicaEndpoint}/diagnosis`;

export const SuggestionAPI = (updatedRequestValue) => {
  axios
    .post(infermedicaSuggestEndpoint, JSON.stringify(updatedRequestValue), {
      headers: {
        "App-Id": infermedicaAppId,
        "App-Key": infermedicaAppKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};
export const DiagnosisAPI = (updatedRequestValue) => {
  axios
    .post(infermedicaDiagnosisAPIEndpoint, JSON.stringify(updatedRequestValue), {
      headers: {
        "App-Id": infermedicaAppId,
        "App-Key": infermedicaAppKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};
