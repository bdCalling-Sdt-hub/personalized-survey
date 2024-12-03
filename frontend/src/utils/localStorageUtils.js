// src/utils/localStorageUtils.js
export const saveToLocalStorage = (inputPlaceholder, inputName, formData) => {
  const question = inputPlaceholder;
  const answer = formData[inputName];
  const existingData = JSON.parse(localStorage.getItem("surveyData")) || {
    questions: [],
  };

  existingData.questions.push({ question, answer });
  localStorage.setItem("surveyData", JSON.stringify(existingData));
};
