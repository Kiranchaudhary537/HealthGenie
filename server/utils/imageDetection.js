import vision from "@google-cloud/vision";
import dotenv from "dotenv";
dotenv.config();

const CONFIG = {
  Credential: {
    private_key: "CREDENTIAL.private_key",
    client_email: "CREDENTIAL.client_email",
  },
};

const client = new vision.ImageAnnotatorClient(CONFIG);

// Performs text detection on the image file

const imageDetection = (req, res) => {
  client
    .textDetection("./rann.jpg")
    .then((results) => {
      const detections = results[0].textAnnotations;
      
      // detections.forEach((text) => console.log(text.description));
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });

  res.send("ok");
};

export default imageDetection;
