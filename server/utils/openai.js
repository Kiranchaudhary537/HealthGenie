import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  organization: "org-gQKLeqKp3RGmVnslYtZpOcIl",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const askToOpenAi = async (req, res) => {

  //prompt engineering from chatgpt

  const prompt = `My age is ${req.body.formData.age} and gender is ${req.body.formData.gender} and my question is is ${req.body.formData.question}`;


  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are medical assistance a.i bot. you primary work is identify user's medical problem and answer in when this type of problem or medical condition . you will not are any question out side of health and medical and mental health related questions. ex. User Question :' My age is x and gender is male/female and my question is I had headache and i didn't sleep and what should i do' bot answer :' headache is comman when take less less and you should take some rest  ex-2 'My age is 48 and gender is female and My question is I missed my periods and why this happened and what should i do' bot answer: You missed your periods because of menopause and it's comman for female to start menopause at 48 years and you should take care of your slef.  Now from this type of questions you should identify take problem or condition is and what kind of question user asked and answer those question as user need ",
        },
        { role: "user", content: prompt },
      ],
    });


    res.send(completion.data.choices[0].message);
  } catch (error) {

    res.status(500).send("Error generating text");
  }
};

