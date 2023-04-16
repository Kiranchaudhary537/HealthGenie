import data from "./../data/suggestion.json" assert { type: "json" };

const suggest = (req, res) => {
  
  res.json(data);
};

export default suggest;
