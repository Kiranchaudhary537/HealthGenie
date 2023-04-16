import useMentalHealthContext from "../../hooks/useMentalHealthContext";
import FormInputs from "./FormInputs";

const Form = () => {
  const {
    prevHide,
    nextHide,
    submitHide,
    disableNext,
    disablePrev,
    canSubmit,
    setPage,
    handleSubmit,
  } = useMentalHealthContext();

  const handlePrev = () => setPage((prev) => prev - 1);

  const handleNext = () => setPage((prev) => prev + 1);

  const content = (
    <div className="w-full border border-gray-300 shadow-md m-4 bg-white p-8 rounded-md h-max">
      <h4 className="text-xl font-medium text-center">
        Mental Health Supporter Bot
      </h4>
      <form className="mt-4" onSubmit={handleSubmit}>
        <header>
          <FormInputs />
        </header>
        <div className="flex flex-row justify-between">
          {!prevHide ? (
            <input
              type="button"
              className="mt-4 px-4 py-2 font-bold bg-gray-300 hover:bg-gray-400 text-gray-800  rounded  focus:outline-none focus:shadow-outline"
              onClick={handlePrev}
              disabled={disablePrev}
              value="Prev"
            />
          ) : (
            <></>
          )}
          {!nextHide ? (
            <input
              type="button"
              className="mt-4 px-4 py-2 font-bold bg-gray-300 hover:bg-gray-400 text-gray-800  rounded  focus:outline-none focus:shadow-outline"
              onClick={handleNext}
              disabled={disableNext}
              value="Next"
            />
          ) : (
            <></>
          )}
          {submitHide ? (
            <button
              type="submit"
              className="mt-4 px-4 py-2 font-bold bg-gray-300 hover:bg-gray-400 text-gray-800  rounded  focus:outline-none focus:shadow-outline"
              disabled={canSubmit}
            >
              Submit
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );

  return content;
};
export default Form;
