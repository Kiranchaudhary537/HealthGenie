import React, { useEffect, useState, useRef } from "react";
import { TbRotate360 } from "react-icons/Tb";
import MaleSvg from "../../utils/MaleSvg";
import MaleBackSvg from "../../utils/MaleBackSvg";
import FemaleSvg from "../../utils/FemaleSvg";
import FemaleBackSvg from "../../utils/FemalBackSvg";
import useSymtomChecker from "../../hooks/useSymtomChecker";

const InitialSymptoms = () => {
  const { formData, formErrors, handleChange } = useSymtomChecker();

  const [str, setString] = useState("");
  const [bodyPosition, setBodyPosition] = useState(true);
  const [nameOfPart, setNameOfPart] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allOptions, setAllOptions] = useState([{}]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [selectedSymptoms, setSelectedSymptoms] = useState(
    formData.Symptoms.length > 0 ? [...formData.Symptoms] : []
  );

  const popoverRef = useRef(null);

  const handleSelect = (value) => {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      const itemIndex = prevSelectedSymptoms.findIndex(
        (symptom) => symptom.id === value.id
      );

      if (itemIndex !== -1) {
        return prevSelectedSymptoms;
      } else {
        return [
          ...prevSelectedSymptoms,
          {
            id: value.id,
            name: value.name,
            choice_id: "present",
            source: "initial",
          },
        ];
      }
    });
  };

  const handleDeselect = (value) => {
    setSelectedSymptoms(selectedSymptoms.filter((item) => item.id != value.id));
  };

  useEffect(() => {
    const element = {
      target: {
        name: "Symptoms",
        value: selectedSymptoms,
      },
    };
    handleChange(element);
  }, [selectedSymptoms]);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handlePopoverClick = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    setIsOpen(true);
  };

  const handlePopoverClose = () => {
    setIsOpen(false);
  };
  const handleChangeForInput = (e) => {
    if (str.length >= 300) {
      alert("Input size must less than 300");
    } else {
      setString(e.target.value);
    }
  };

  return (
    <div>
      <div
        className={`w-full h-full border rounded-lg flex  justify-center  ${
          formErrors.Symptoms && "border-red-500"
        }`}
        onClick={(e) => handleClickOutside(e)}
      >
        <div className="w-1/2 p-2  flex flex-col items-center justify-center">
          <div
            onClick={handlePopoverClick}
            className="h-full w-full  p-8 flex items-center justify-center"
          >
            {formData?.gender == "male" ? (
              bodyPosition ? (
                <MaleSvg
                  setSelectedOptions={setAllOptions}
                  setNameOfPart={setNameOfPart}
                />
              ) : (
                <MaleBackSvg
                  setSelectedOptions={setAllOptions}
                  setNameOfPart={setNameOfPart}
                />
              )
            ) : bodyPosition ? (
              <FemaleSvg
                setSelectedOptions={setAllOptions}
                setNameOfPart={setNameOfPart}
              />
            ) : (
              <FemaleBackSvg
                setSelectedOptions={setAllOptions}
                setNameOfPart={setNameOfPart}
              />
            )}
          </div>
          <div
            className="flex flex-row "
            onClick={() => {
              setBodyPosition(!bodyPosition);
            }}
          >
            <TbRotate360 className="w-6 h-6" title="Rotate" />
            <label>Rotate 360</label>
          </div>
          {isOpen && (
            <div
              className="absolute bg-white shadow-lg rounded-lg p-4"
              style={{ left: position.x, top: position.y }}
              ref={popoverRef}
            >
              <div className="text-lg font-bold mb-2">{nameOfPart}</div>
              <div className="text-gray-700 text-base w-72 h-48 overflow-y-auto">
                {Object.keys(allOptions).map((option) => {
                  return option ? (
                    <div 
                      key={allOptions[option].id}
                      className="flex flex-row border-b"
                    >
                      <button
                        type="button"
                        className="hover:bg-gray-100 focus:bg-gray-100 rounded m-2 align-left text-left"
                        onClick={(e) => {
                          setIsOpen(false);
                          handleSelect(allOptions[option]);
                        }}
                      >
                        {allOptions[option].name}
                      </button>
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>

              <button
                className="mt-4 bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4 rounded"
                onClick={handlePopoverClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="w-1/2  p-3   flex flex-col justify-between">
          <div>
            {/* <p className="m-1">Character limit: {str.length} / 300 </p>
            <textarea
              className="w-full px-4 py-2 rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => {
                handleChangeForInput(e);
              }}
              style={{ resize: "none" }}
              placeholder="Write your symptom or condition in detail, e.g. I had a headache and vomited several times, and I had a sore throat..."
              rows={6} // specify the number of rows
            />
            <div class="flex items-center">
              <div class="flex-1 border-t border-2 border-dotted"></div>
              <div class="px-4">OR</div>
              <div class="flex-1 border-t   border-2 border-dotted"></div>
            </div> */}
            <h1 class="text-2xl font-bold mb-2">Your Symptoms</h1>
            <p class="text-gray-500 mb-4">Add as many symptoms as you can</p>
            <div className="flex flex-row flex-wrap">
              {selectedSymptoms.map((e) => (
                <div
                  key={e.id}
                  className="bg-gray-200 rounded-full py-1 px-3 m-2 flex items-center overflow-hidden "
                >
                  <span
                    class="mr-2 whitespace-nowrap overflow-hidden overflow-ellipsis"
                    title={`${e.name}`}
                  >
                    {e.name?.split(" ").slice(0, 3).join(" ")}
                    {e.name?.split(" ").length > 3 && "..."}
                  </span>
                  <button
                    className="bg-gray-500 text-white rounded-full px-1 hover:bg-gray-700"
                    type="button"
                    onClick={() => handleDeselect(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.697 2.697a1 1 0 011.414 0L10 8.586l5.889-5.89a1 1 0 111.414 1.414L11.414 10l5.89 5.889a1 1 0 01-1.414 1.414L10 11.414l-5.889 5.89a1 1 0 01-1.414-1.414L8.586 10 2.697 4.111a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
      <div>
        <div>
          {formErrors.Symptoms && (
            <p className="text-red-500 text-xs italic">{formErrors.Symptoms}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InitialSymptoms;
