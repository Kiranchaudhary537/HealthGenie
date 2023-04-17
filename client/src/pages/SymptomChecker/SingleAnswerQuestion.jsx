import React, { useState, useEffect } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";

function SingleAnswerQuestion({ question }) {
  const [answer, setAnswer] = useState({ choice_id: "", id: "" });
  const { handleChange } = useSymtomChecker();
  const { text, items } = question;

  const handleChangeOfForm = (event) => {
    const { id, value } = event.target;
    setAnswer({ id: id, choice_id: value });
  };

  useEffect(() => {
    const element = {
      target: {
        name: "Diagnosis",
        value: answer,
      },
    };
    handleChange(element);
  }, [answer]);

  useEffect(() => {
    setAnswer({ choice_id: "", id: items[0].id });

  }, [items]);

  
  return (
    <div className="my-4 px-4 py-2 rounded-lg">
      {items.length > 1 && <h2 className="font-bold text-lg mb-2">{text}</h2>}

      <ul className="list-disc ml-6">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`my-2 pt-2 ${
              index === 0 ? "" : " border-t-2 "
            } flex flex-col sm:flex-row justify-between`}
          >
            {items.length > 1 ? (
              <h3 className="font-medium mb-2 sm:mb-0">{item.name}</h3>
            ) : (
              <h3 className="font-medium text-lg mb-2">{text}</h3>
            )}

            <div className="ml-4 flex flex-row justify-start">
              {item.choices.map((choice, i) => (
                <div
                  key={choice.id}
                  className="flex items-center mr-4 sm:mr-2 mb-2 sm:mb-0"
                >
                  <input
                    type="radio"
                    id={item.id}
                    name={item.id}
                    value={choice.id}
                    onChange={(e) => {
                      handleChangeOfForm(e);
                    }}
                    checked={answer.choice_id === choice.id}
                    className="mr-2"
                  />
                  <label htmlFor={choice.id}>{choice.label}</label>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleAnswerQuestion;
