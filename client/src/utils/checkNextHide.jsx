export function checkNextHide(page, formData, formErrors) {
  if (page === 0) {
    return (
      formErrors.age !== "" ||
      formErrors.gender !== "" ||
      formErrors.ResidenceOrTravel !== "" ||
      formData.age.length === 0 ||
      formData.gender.length === 0 ||
      formData.ResidenceOrTravel.length === 0
    );
  } else if (page === 1) {
    return formErrors.CommanRisk !== "" || formData.CommanRisk.length === 0;
  } else if (page === 2) {
    return formErrors.Symptoms !== "" || formData.Symptoms.length === 0;
  } else if (page === 3) {
    return formErrors.Suggestion !== "" || formData.Suggestion.length === 0;
  }
}
