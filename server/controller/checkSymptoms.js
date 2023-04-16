import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  organization: "org-gQKLeqKp3RGmVnslYtZpOcIl",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// openai.api_key = process.env.OPEN_API_KEY;
export const checkSymptoms = async (req, res) => {
  console.log("working");
  const countryTravelled = () => {
    if (req.body.que6 == "yes") {
      return "I travelled to other country";
    } else {
      return "I didn't travelled to any country recently.";
    }
  };
  const contactToSymptoms = () => {
    if (req.body.que7 == "yes") {
      return "I have been in contact with anyone who has a similar illness";
    } else {
      return "I didn't contact with anyone who has a similar illness ";
    }
  };
  const prompt = `I had symptoms of ${req.body.que1}. symtoms begin ${
    req.body.que2
  }days, symtoms getting ${req.body.que3} I am experiencing ${
    req.body.que4
  } any pain or discomfort and i have ${
    req.body.que5
  } any other symptoms or conditions that may be related to your current symptoms and  ${countryTravelled()} and ${contactToSymptoms()} and i have ${
    req.body.que8
  } pre-medical conditions,currently taking  ${
    req.body.que9
  } medications or supplements and i had ${
    req.body.que10
  }experienced these symptoms before`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are medical assistance a.i bot. you primary work is identify user's symptom and medical condition. ex.I had sore throat and fever, sympton begin few day early. symtons getting bad. symtoms are newler and no country visited nor any body with this symtoms had contacts few.answer to ai should be cough ",
        },
        { role: "user", content: prompt },
      ],
    });
    //   .then((e) => res.send(e.data.choices));
    console.log(completion.data.choices[0].message);
    res.send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text");
  }
};
