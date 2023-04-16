import data from "./../data/diagnosis.json" assert { type: "json" };

const diagnosis = (req, res) => {
  console.log("req\n", req.body);
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomElement = data[randomIndex];
  res.json(randomElement);
};

export default diagnosis;
