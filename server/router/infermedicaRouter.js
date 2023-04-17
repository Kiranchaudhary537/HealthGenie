import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const infermedicaRouter = express.Router();

const infermedicaEndpoint = "https://api.infermedica.com/v3";

const infermedicaSuggestEndpoint = `${infermedicaEndpoint}/suggest`;
const infermedicaDiagnosisAPIEndpoint = `${infermedicaEndpoint}/diagnosis`;

infermedicaRouter.post("/diagnosis", async (req, res) => {
  const requestValue = req.body;
  const filteredSelectedOptions = requestValue.evidence.map((obj) => {
    const { name, ...rest } = obj;
    return rest;
  });

  const filteredEvidence = filteredSelectedOptions.filter(
    (obj) => obj.id !== "" && obj.choice_id !== ""
  );

  const updatedRequestValue = {
    ...requestValue,
    evidence: filteredEvidence,
  };

  try {
    const response = await axios.post(
      infermedicaDiagnosisAPIEndpoint,
      JSON.stringify(updatedRequestValue),
      {
        headers: {
          "App-Id": process.env.INFERMEDICA_APP_ID,
          "App-Key": process.env.INFERMEDICA_APP_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function hasInitialSource(arr) {
  return arr.some((obj) => obj.source === "initial");
}

infermedicaRouter.post("/suggest", async (req, res) => {
  const requestValue = req.body;
  const filteredSelectedOptions = requestValue.evidence.map((obj) => {
    const { name, ...rest } = obj;
    return rest;
  });

  const filteredEvidence = filteredSelectedOptions.filter(
    (obj) => obj.id !== "" && obj.choice_id !== ""
  );

  const updatedRequestValue = {
    ...requestValue,
    evidence: filteredEvidence,
  };

  try {
    const response = await axios.post(
      infermedicaSuggestEndpoint,
      JSON.stringify(updatedRequestValue),
      {
        headers: {
          "App-Id": process.env.INFERMEDICA_APP_ID,
          "App-Key": process.env.INFERMEDICA_APP_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default infermedicaRouter;
