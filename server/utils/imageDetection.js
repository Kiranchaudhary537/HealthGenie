import vision from "@google-cloud/vision";
// const image from "./../rann.jpg";
import dotenv from "dotenv";
dotenv.config();
const CREDENTIAL = JSON.parse(
  JSON.stringify({
    type: "service_account",
    project_id: "healthgenie-383106",
    private_key_id: "54c4cf61ea47ced8b8cc2942808beee9b5d37c37",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDa8KcPr/d/RjK7\nFQunbJFI7iFa6LeEhHRl8zvsy1W1FQX2+Sv8N9TC/Srpo536jO617u1aR8p5rfUX\nYck4YCEbY2uvlWY7Qo/TrvHTo1pbkL2/T5NptclLlPgsZQbCeEzo3A7Tzi/xLNMp\nQl2r5V2Il7Vp4shx/Jc+jKHO8ZZKl5EApCOmMrl/l3bhPlvfuYNOStxjaDO91ixh\n6WqDuixhw/wPMOxsDe9yMR7ahmM4jPtB0ozfbvhgm80P8pG/nYvR5sWH/zqvgkwV\nK23OKHAQkuxXL7Rp6+ZZbXukuZTwj3cMikv7KzIabz1zZDPtzCbPmRMjXM6aUWd0\n/3uPMf9NAgMBAAECggEAWNAQZNuz4Uw/ngZugM8YrGX03+TRNQ9qDEU8BNWDAf7y\nOXpgbmLTivmZ48b8ebubxe+TFvFSYEPBzWdcceME6xBMiaBoJRfeMjegX4K/T6+K\nWUXVfadBbciTV6bvtAmK4VcLKL5WUlYlnnIOf4F+jL9F1xsoxpx5WeVAais0FTNg\nJqiE+QvJw3R+nk+W4DHGBigD3gVd8JN2fnJleQ8p5FnLFypQ1UCwWZ2oT8K7tpie\nTk2NZg3tmAqJkx2wdZb9HKC/z8WiG1hIVRyMiwak3v+ipqH9SOs4CpyEu7Qlixa/\n0LZAB2fFWAuRQKWY18RCS2vm/OlxdjyCjdLx4w+KvQKBgQD8V7qTLnjDl9eAXhCq\n9dTDfyP8lz9GPJgA8ozANnk2+xCp0MaS6m+IdrVyySWiNK9Jyesm3cgpMk6wmw+W\nIFQKxlmwKZKDSwkeYEI+BBo/5jZqLj8H2NLpohNEOrg5P/6kIewf35k4884NohhG\nTI9y5L2HdcUXo38J0U0hNvld0wKBgQDeHP1KANVZQpAm3Sx3YSh9mPTqiy2Fel+G\nil03A1xMFLVZTXjXj31lbdfE79QQAyP9TSZ778Q4nUyQ490uLxloW9pOyNOFoKJ5\nEDMYqdBoBRwPxzuwSN8fuw3rL1V/jqrGuxEaTluqU159dUTdd9HYAI+B2SIO2JDv\ndxkEBCRaXwKBgE5RHALaBXkPAz8/8oRcz6/tIcofVvABlluU68IsJeq+eSl7NmYa\nhIsh7Ka3bwqst0p7dJQXeSvwBSQiu++oEO1XKjbWcDZ3b1kSHv0IYO08Ed9agw14\nad1BBCHE57A9AFcIgDRUPUXDxUvN5yLKWCscewYzsvvnLmJppzqLyVEpAoGBANfU\nbaAyjR5uWusY8nOSmqjpL9yVn4dbsWVoIEor3s0jNlFvwaQdj6k3Ansg3P0uQBOM\nm3/FLfQhjdwhP7T4GYVZ9BmodjocLKTdQ/mMUbIyfOEsJWkYdpA70LufREJuHK59\n6pGYYORynJfmkyNtoiB18v0nRDwO30+CeHF5oOWbAoGAToNcVQZhBDvavEVEYL+F\njsm9ghnSXe1o6DkzXI4Lgoa9VrnsuBMjpBH0OlkE1PIBex48yTA3YMbWWM4IOY0M\nSItxhiCr1YxAkytIWIS0Agut7dFkZYRXBnJru+Dx+mAod5sI6H7Pt+3YrHQwBsR3\nc6+Z5MU4eQY38phkn6E/sDI=\n-----END PRIVATE KEY-----\n",
    client_email: "kiranchaudhary@healthgenie-383106.iam.gserviceaccount.com",
    client_id: "100236758233997411256",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/kiranchaudhary%40healthgenie-383106.iam.gserviceaccount.com",
  })
);

const CONFIG = {
  Credential: {
    private_key: CREDENTIAL.private_key,
    client_email: CREDENTIAL.client_email,
  },
};
const client = new vision.ImageAnnotatorClient();
// Performs text detection on the image file
const imageDetection = (req, res) => {
  console.log(req.body);
  client
    .textDetection("./rann.jpg")
    .then((results) => {
      const detections = results[0].textAnnotations;
      console.log("Text:");
      detections.forEach((text) => console.log(text.description));
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
  res.send("ok");
};

export default imageDetection;
