import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
import fetch from "node-fetch";

const infermedicaRouter = express.Router();

// const infermedicaApi = {
//   appId: process.env.INFERMEDICA_APP_ID,
//   appKey: process.env.INFERMEDICA_APP_KEY,
//   apiUrl: "https://api.infermedica.com/v3/",
//   apiModel: "infermedica-en",
// };
const infermedicaApi = {
  apiUrl: "https://api.infermedica.com/v3/",
  appId: process.env.INFERMEDICA_APP_ID,
  appKey: process.env.INFERMEDICA_APP_KEY,
};
// const getHeaders = async (interviewId) => {
//   const headers = new Headers();
//   // const Headers = (await import('node-fetch')).Headers
//   // headers = new Headers(headers)
//   headers.append("App-Id", infermedicaApi.appId);
//   headers.append("App-Key", infermedicaApi.appKey);
//   headers.append("Model", infermedicaApi.apiModel);
//   headers.append("Content-Type", "application/json");
//   headers.append("Interview-Id", interviewId);
//   return headers;
// };

infermedicaRouter.post("/diagnosis", async (req, res) => {
  const url = `${infermedicaApi.apiUrl}diagnosis`;
  const data = JSON.stringify(req.body);
  const interviewId = req.body.interview_id;
  res.status(200).json("ok");
  // try {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: getHeaders(interviewId),
  //     body: data,
  //   });
  //   const json = await response.json();
  //   res.json(json);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Internal server error");
  // }
});

infermedicaRouter.post("/suggest", (req, res) => {
  const url = `${infermedicaApi.apiUrl}suggest`;
  const data = JSON.stringify(req.body);

  axios
    .post(url, data, {
      headers: {
        "App-Id": infermedicaApi.appId,
        "App-Key": infermedicaApi.appKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

export default infermedicaRouter;
