import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  organization: "org-gQKLeqKp3RGmVnslYtZpOcIl",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// openai.api_key = process.env.OPEN_API_KEY;
export const askToOpenAi = async (req, res) => {
  console.log(req.body);
  const prompt = `My age is ${req.body.formData.age} and gender is ${req.body.formData.gender} and my question is is ${req.body.formData.question}`;
  try {
    // const response = await openai.createChatCompletion({
    //   engine: "davinci",
    //   prompt: prompt,
    //   max_tokens: 60,
    // });
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
    //   .then((e) => res.send(e.data.choices));
    console.log(completion.data.choices[0].message);
    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text");
  }
};

// export const askToOpenAi = async (prompt) => {
//   await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt:
//       'I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: Where is the Valley of Kings?\nA:',
//     temperature: 0,
//     max_tokens: 100,
//     top_p: 1,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.0,
//     stop: ["\n"],
//   });
// };
