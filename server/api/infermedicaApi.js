import dotenv from "dotenv";

class InfermedicaApi {
  constructor(
    appId,
    appKey,
    interviewId,
    apiModel = "infermedica-en",
    apiUrl = "https://api.infermedica.com/v3/"
  ) {
    this.appId = appId;
    this.appKey = appKey;

    this.apiUrl = apiUrl;
    this.apiModel = apiModel;

    this.interviewId = interviewId;
  }

  async request(method, url, data) {
    const headers = new fetch.Headers();
    headers.append("App-Id", this.appId);
    headers.append("App-Key", this.appKey);
    headers.append("Model", this.apiModel);
    headers.append("Content-Type", "application/json");

    const response = await fetch(this.apiUrl + url, {
      method,
      headers,
      body: data,
    });
    return await response.json();
  }

  get(url) {
    return this.request("GET", url);
  }

  post(url, data) {
    return this.request("POST", url, data);
  }

  getRiskFactors(age) {
    return this.get(`risk_factors?age.value=${age.value}`);
  }

  parse(data) {
    return this.post("parse", JSON.stringify(data));
  }

  getSuggestedSymptoms(data) {
    return this.post("suggest", JSON.stringify(data));
  }

  diagnosis(data) {
    return this.post("diagnosis", JSON.stringify(data));
  }

  explain(data) {
    return this.post("explain", JSON.stringify(data));
  }
}

export function infermedicaApiMiddleware(req, res, next) {
  const infermedicaApi = new InfermedicaApi(
    process.env.APP_ID,
    process.env.APP_KEY,
    req.interviewId
  );

  req.infermedicaApi = infermedicaApi;
  next();
}
