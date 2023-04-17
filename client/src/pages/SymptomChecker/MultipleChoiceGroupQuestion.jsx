import React, { useState, useEffect, useRef } from "react";
import useSymtomChecker from "../../hooks/useSymtomChecker";

function MultipleChoiceGroupQuestion({ question }) {
  const { text, items } = question;
  const [answers, setAnswers] = useState([{}]);

  const { handleChange } = useSymtomChecker();

  const handleChangeOfForm = (event) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === event.target.id
          ? { ...answer, choice_id: event.target.value }
          : answer
      )
    );
  };
  const isChoiceSelected = (id, choiceId) =>
    answers.some((answer) => answer.id === id && answer.choice_id == choiceId);

  useEffect(() => {
    const element = {
      target: {
        name: "Diagnosis",
        value: answers,
      },
    };
    handleChange(element);
  }, [answers]);

  useEffect(() => {
    setAnswers(items.map((item) => ({ choice_id: "", id: item.id })));
  }, [items]);

  const options = items.map((item, index) => (
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
              checked={isChoiceSelected(item.id, choice.id)}
              onChange={handleChangeOfForm}
              className="mr-2"
            />
            <label htmlFor={choice.id}>{choice.label}</label>
          </div>
        ))}
      </div>
    </li>
  ));
  
  return (
    <div className="my-4 px-4 py-2 rounded-lg">
      {items.length > 1 && <h2 className="font-bold text-lg mb-2">{text}</h2>}

      <ul className="list-disc ml-6">{options}</ul>
    </div>
  );
}

export default MultipleChoiceGroupQuestion;
