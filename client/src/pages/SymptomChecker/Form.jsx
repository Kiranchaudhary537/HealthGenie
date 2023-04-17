import FormInputs from "./FormInputs";
import useSymtomChecker from "./../../hooks/useSymtomChecker";

const Form = () => {
  const {
    title,
    page,
    prevHide,
    resetForm,
    nextHide,
    submitHide,
    canSubmit,
    setPage,
    handleSubmit,
  } = useSymtomChecker();

  const handlePrev = () => setPage((prev) => prev - 1);

  const handleNext = () => setPage((prev) => prev + 1);

  const content = (
    <div className="w-full  mx-auto max-w-2xl max-w-lg">
      <div className="relative pt-1">
        <input
          type="range"
          min={1}
          max={Object.keys(title).length}
          value={page + 1}
          readOnly={true}
          className="w-full h-2 appearance-none rounded-full bg-gray-300"
        />
        <div className="flex justify-between text-xs font-semibold text-gray-600">
          <span>1</span>
          <span>{Object.keys(title).length}</span>
        </div>
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        <header>
          <FormInputs />
        </header>
        {page != 5 ? (
          <div className="flex flex-row justify-between">
            {!prevHide ? (
              <button
                type="button"
                className="mt-4 px-4 py-2 font-bold bg-gray-300 hover:bg-gray-400 text-gray-800  rounded  focus:outline-none focus:shadow-outline"
                onClick={handlePrev}
                disabled={prevHide}
              >
                Prev
              </button>
            ) : (
              <></>
            )}
            {page != Object.keys(title).length - 2 ? (
              <button
                type="button"
                className={`mt-4 px-4 py-2  ${
                  nextHide == true
                    ? "bg-red-300 border border-red-500 text-red-800 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
                onClick={handleNext}
                disabled={nextHide}
              >
                Next
              </button>
            ) : (
              <></>
            )}
            {!submitHide ? (
              <button
                type="button"
                className="mt-4 px-4 py-2 font-bold bg-gray-300 hover:bg-gray-400 text-gray-800  rounded  focus:outline-none focus:shadow-outline"
                disabled={canSubmit}
                onClick={() => setPage(page + 1)}
              >
                Submit
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </form>
      <div className="mt-4">
        <button
          type="button"
          className="mt-4 px-4 py-2 font-bold bg-gray-300 hover:bg-gray-400 text-gray-800  rounded  focus:outline-none focus:shadow-outline"
          onClick={() => {
            resetForm();
          }}
        >
          Reset Form
        </button>
      </div>
    </div>
  );

  return content;
};
export default Form;
