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
